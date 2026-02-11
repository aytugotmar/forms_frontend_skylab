// Mock data for dashboard charts - Gerçek API'ye geçene kadar kullanılacak

// Son 30 günün yanıt trendi
export const responsesTrendData = [
  { date: "12 Oca", responses: 5, formA: 3, formB: 2, formC: 0 },
  { date: "13 Oca", responses: 8, formA: 4, formB: 2, formC: 2 },
  { date: "14 Oca", responses: 12, formA: 6, formB: 4, formC: 2 },
  { date: "15 Oca", responses: 7, formA: 3, formB: 2, formC: 2 },
  { date: "16 Oca", responses: 15, formA: 8, formB: 5, formC: 2 },
  { date: "17 Oca", responses: 18, formA: 10, formB: 5, formC: 3 },
  { date: "18 Oca", responses: 10, formA: 5, formB: 3, formC: 2 },
  { date: "19 Oca", responses: 4, formA: 2, formB: 1, formC: 1 },
  { date: "20 Oca", responses: 6, formA: 3, formB: 2, formC: 1 },
  { date: "21 Oca", responses: 14, formA: 7, formB: 5, formC: 2 },
  { date: "22 Oca", responses: 16, formA: 8, formB: 6, formC: 2 },
  { date: "23 Oca", responses: 20, formA: 11, formB: 6, formC: 3 },
  { date: "24 Oca", responses: 22, formA: 12, formB: 7, formC: 3 },
  { date: "25 Oca", responses: 11, formA: 5, formB: 4, formC: 2 },
  { date: "26 Oca", responses: 8, formA: 4, formB: 2, formC: 2 },
  { date: "27 Oca", responses: 17, formA: 9, formB: 6, formC: 2 },
  { date: "28 Oca", responses: 19, formA: 10, formB: 6, formC: 3 },
  { date: "29 Oca", responses: 21, formA: 11, formB: 7, formC: 3 },
  { date: "30 Oca", responses: 23, formA: 13, formB: 7, formC: 3 },
  { date: "31 Oca", responses: 25, formA: 14, formB: 8, formC: 3 },
  { date: "1 Şub", responses: 18, formA: 10, formB: 6, formC: 2 },
  { date: "2 Şub", responses: 12, formA: 6, formB: 4, formC: 2 },
  { date: "3 Şub", responses: 16, formA: 9, formB: 5, formC: 2 },
  { date: "4 Şub", responses: 20, formA: 11, formB: 6, formC: 3 },
  { date: "5 Şub", responses: 24, formA: 13, formB: 8, formC: 3 },
  { date: "6 Şub", responses: 28, formA: 15, formB: 9, formC: 4 },
  { date: "7 Şub", responses: 15, formA: 8, formB: 5, formC: 2 },
  { date: "8 Şub", responses: 9, formA: 4, formB: 3, formC: 2 },
  { date: "9 Şub", responses: 22, formA: 12, formB: 7, formC: 3 },
  { date: "10 Şub", responses: 26, formA: 14, formB: 9, formC: 3 },
];

// Form performans verisi (Bar chart için)
export const formPerformanceData = [
  { name: "İletişim Formu", responses: 156, avgTime: "2.3 dk" },
  { name: "Geri Bildirim", responses: 134, avgTime: "1.8 dk" },
  { name: "Başvuru Formu", responses: 98, avgTime: "4.5 dk" },
  { name: "Anket 2024", responses: 87, avgTime: "3.2 dk" },
  { name: "Etkinlik Kaydı", responses: 76, avgTime: "1.5 dk" },
  { name: "Destek Talebi", responses: 65, avgTime: "2.8 dk" },
  { name: "Ürün İnceleme", responses: 54, avgTime: "3.7 dk" },
  { name: "Newsletter", responses: 43, avgTime: "0.8 dk" },
];

// Yanıt dağılımı (Pie/Donut chart için)
export const responseDistributionData = [
  { name: "İletişim Formu", value: 156, color: "#3b82f6" },
  { name: "Geri Bildirim", value: 134, color: "#8b5cf6" },
  { name: "Başvuru Formu", value: 98, color: "#ec4899" },
  { name: "Anket 2024", value: 87, color: "#f59e0b" },
  { name: "Etkinlik Kaydı", value: 76, color: "#10b981" },
  { name: "Diğer", value: 162, color: "#6b7280" },
];

// Aktivite Heatmap verisi (Gün x Saat)
export const activityHeatmapData = [
  // Pazartesi
  { day: "Pzt", hour: "00-04", value: 2 },
  { day: "Pzt", hour: "04-08", value: 1 },
  { day: "Pzt", hour: "08-12", value: 45 },
  { day: "Pzt", hour: "12-16", value: 38 },
  { day: "Pzt", hour: "16-20", value: 52 },
  { day: "Pzt", hour: "20-24", value: 12 },
  // Salı
  { day: "Sal", hour: "00-04", value: 3 },
  { day: "Sal", hour: "04-08", value: 2 },
  { day: "Sal", hour: "08-12", value: 48 },
  { day: "Sal", hour: "12-16", value: 42 },
  { day: "Sal", hour: "16-20", value: 55 },
  { day: "Sal", hour: "20-24", value: 15 },
  // Çarşamba
  { day: "Çar", hour: "00-04", value: 1 },
  { day: "Çar", hour: "04-08", value: 2 },
  { day: "Çar", hour: "08-12", value: 51 },
  { day: "Çar", hour: "12-16", value: 45 },
  { day: "Çar", hour: "16-20", value: 58 },
  { day: "Çar", hour: "20-24", value: 18 },
  // Perşembe
  { day: "Per", hour: "00-04", value: 2 },
  { day: "Per", hour: "04-08", value: 1 },
  { day: "Per", hour: "08-12", value: 49 },
  { day: "Per", hour: "12-16", value: 44 },
  { day: "Per", hour: "16-20", value: 60 },
  { day: "Per", hour: "20-24", value: 16 },
  // Cuma
  { day: "Cum", hour: "00-04", value: 3 },
  { day: "Cum", hour: "04-08", value: 2 },
  { day: "Cum", hour: "08-12", value: 52 },
  { day: "Cum", hour: "12-16", value: 40 },
  { day: "Cum", hour: "16-20", value: 54 },
  { day: "Cum", hour: "20-24", value: 20 },
  // Cumartesi
  { day: "Cmt", hour: "00-04", value: 5 },
  { day: "Cmt", hour: "04-08", value: 3 },
  { day: "Cmt", hour: "08-12", value: 28 },
  { day: "Cmt", hour: "12-16", value: 35 },
  { day: "Cmt", hour: "16-20", value: 42 },
  { day: "Cmt", hour: "20-24", value: 25 },
  // Pazar
  { day: "Paz", hour: "00-04", value: 4 },
  { day: "Paz", hour: "04-08", value: 2 },
  { day: "Paz", hour: "08-12", value: 22 },
  { day: "Paz", hour: "12-16", value: 30 },
  { day: "Paz", hour: "16-20", value: 38 },
  { day: "Paz", hour: "20-24", value: 22 },
];

// Stat kartları için mini sparkline verisi
export const sparklineData = {
  totalForms: [5, 6, 7, 7, 8, 9, 10, 11, 12, 12, 13, 14, 15],
  totalResponses: [
    120, 135, 148, 162, 178, 195, 210, 225, 242, 258, 275, 290, 308,
  ],
  linkedForms: [2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
  avgResponseTime: [
    3.2, 3.1, 3.0, 2.9, 2.8, 2.9, 3.0, 2.8, 2.7, 2.6, 2.7, 2.8, 2.6,
  ],
};

// Zaman dilimine göre karşılaştırma
export const comparisonData = {
  thisWeek: { responses: 156, forms: 12, avgPerDay: 22 },
  lastWeek: { responses: 134, forms: 10, avgPerDay: 19 },
  growth: { responses: 16.4, forms: 20, avgPerDay: 15.8 },
};

// Form tamamlanma oranları
export const completionRatesData = [
  { name: "İletişim Formu", started: 200, completed: 156, rate: 78 },
  { name: "Geri Bildirim", started: 150, completed: 134, rate: 89 },
  { name: "Başvuru Formu", started: 145, completed: 98, rate: 68 },
  { name: "Anket 2024", started: 120, completed: 87, rate: 73 },
  { name: "Etkinlik Kaydı", started: 95, completed: 76, rate: 80 },
];
