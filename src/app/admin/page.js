"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowRight,
    ChartColumn,
    FilePlus,
    FileText,
    List,
    RefreshCw,
    Waypoints,
} from "lucide-react";

import ActionButton from "./components/utils/ActionButton";
import ListItem, { ListItemSkeleton } from "./components/ListItem";
import { useUserFormsQuery } from "@/lib/hooks/useFormAdmin";

const fadeIn = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
};

function formatRelativeDate(input) {
    if (!input) return "—";
    const date = new Date(input);
    if (Number.isNaN(date.getTime())) return "—";

    try {
        return new Intl.DateTimeFormat("tr-TR", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
    } catch {
        return date.toLocaleString();
    }
}

function StatCard({ icon: Icon, label, value, hint, href }) {
    const content = (
        <div className="rounded-2xl border border-black/40 bg-black/15 p-5 shadow-sm backdrop-blur transition-colors hover:bg-black/20">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-neutral-900/40 text-neutral-200">
                    <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-neutral-500">{label}</p>
                    <p className="mt-1 text-2xl font-semibold text-neutral-100">{value}</p>
                    {hint ? (
                        <p className="mt-1 text-[11px] text-neutral-500">{hint}</p>
                    ) : null}
                </div>
                {href ? (
                    <ArrowRight className="h-4 w-4 text-neutral-500" />
                ) : null}
            </div>
        </div>
    );

    if (!href) return content;
    return (
        <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-2xl">
            {content}
        </Link>
    );
}

export default function Admin() {
    const router = useRouter();
    const { data: formsData, isLoading, error, refetch, isFetching } = useUserFormsQuery();

    const forms = useMemo(() => (Array.isArray(formsData) ? formsData : []), [formsData]);

    const formsById = useMemo(() => {
        const map = new Map();
        forms.forEach((form) => {
            if (form?.id) map.set(form.id, form);
        });
        return map;
    }, [forms]);

    const stats = useMemo(() => {
        const totalForms = forms.length;
        const totalResponses = forms.reduce((acc, form) => acc + (Number(form?.responseCount) || 0), 0);
        const linkedForms = forms.reduce((acc, form) => acc + (form?.linkedFormId ? 1 : 0), 0);
        const lastUpdated = forms
            .map((f) => f?.updatedAt)
            .filter(Boolean)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];

        return { totalForms, totalResponses, linkedForms, lastUpdated };
    }, [forms]);

    const recentForms = useMemo(() => {
        return [...forms]
            .sort((a, b) => new Date(b?.updatedAt || 0) - new Date(a?.updatedAt || 0))
            .slice(0, 5);
    }, [forms]);

    const topRespondedForms = useMemo(() => {
        return [...forms]
            .sort((a, b) => (Number(b?.responseCount) || 0) - (Number(a?.responseCount) || 0))
            .slice(0, 5);
    }, [forms]);

    const hasError = Boolean(error);

    return (
        <div className="p-6 space-y-6">
            <motion.div {...fadeIn} className="pb-2 border-b border-white/10">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="min-w-0">
                        <h1 className="text-xl font-semibold text-neutral-200">Dashboard</h1>
                        <p className="text-xs mt-2 text-neutral-500">
                            Formlarının genel görünümü, hızlı işlemler ve son aktivite
                        </p>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                        <ActionButton
                            icon={RefreshCw}
                            size="md"
                            tone="header"
                            onClick={() => refetch()}
                            title={isFetching ? "Yenileniyor..." : "Yenile"}
                            aria-label="Yenile"
                        />
                        <ActionButton
                            icon={FilePlus}
                            variant="primary"
                            size="md"
                            tone="header"
                            onClick={() => router.push("/admin/forms/new-form")}
                            title="Yeni form"
                            aria-label="Yeni form"
                        />
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={FileText} label="Toplam form" value={stats.totalForms} href="/admin/forms" />
                <StatCard icon={ChartColumn} label="Toplam yanıt" value={stats.totalResponses} hint="Tüm formların toplamı" href="/admin/forms" />
                <StatCard icon={Waypoints} label="Bağlı form" value={stats.linkedForms} hint="Başka bir forma yönlendiren" href="/admin/forms" />
                <StatCard icon={List} label="Son güncelleme" value={formatRelativeDate(stats.lastUpdated)} hint="Form güncelleme zamanı" href="/admin/forms" />
            </div>

            {isLoading ? (
                <div className="space-y-3">
                    <div className="rounded-2xl border border-neutral-900 bg-neutral-950/50 p-4 text-sm text-neutral-400">
                        Dashboard yükleniyor...
                    </div>
                    <ListItemSkeleton count={3} />
                </div>
            ) : hasError ? (
                <div className="rounded-2xl border border-neutral-900 bg-neutral-950/50 p-6 text-sm text-neutral-400">
                    Dashboard verileri yüklenemedi.
                </div>
            ) : forms.length === 0 ? (
                <div className="rounded-2xl border border-neutral-900 bg-neutral-950/50 p-6 text-sm text-neutral-400">
                    Henüz hiç form yok. Başlamak için &quot;Yeni Form&quot; oluştur.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <section className="space-y-3">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-semibold text-neutral-200">Son güncellenen formlar</h2>
                            <div className="ml-auto">
                                <Link href="/admin/forms" className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors">
                                    Tümünü gör
                                </Link>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            {recentForms.map((form) => {
                                const linkedForm = form?.linkedFormId ? formsById.get(form.linkedFormId) : null;
                                return (
                                    <ListItem
                                        key={form.id}
                                        form={form}
                                        linkedForm={linkedForm}
                                        viewHref={`/admin/forms/${form.id}?tab=responses`}
                                        editHref={`/admin/forms/${form.id}`}
                                    />
                                );
                            })}
                        </div>
                    </section>

                    <section className="space-y-3">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-semibold text-neutral-200">En çok yanıt alanlar</h2>
                            <div className="ml-auto">
                                <Link href="/admin/forms" className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors">
                                    Formlara git
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            {topRespondedForms.map((form) => {
                                const linkedForm = form?.linkedFormId ? formsById.get(form.linkedFormId) : null;
                                return (
                                    <ListItem
                                        key={form.id}
                                        form={form}
                                        linkedForm={linkedForm}
                                        viewHref={`/admin/forms/${form.id}?tab=responses`}
                                        editHref={`/admin/forms/${form.id}`}
                                    />
                                );
                            })}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}
