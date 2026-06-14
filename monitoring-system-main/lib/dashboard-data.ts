export type Severity = "yuksek" | "orta" | "dusuk"

export const navItems = [
  { id: "genel", label: "Genel Bakış", icon: "layers" },
  { id: "harita", label: "Harita", icon: "map" },
  { id: "anomali", label: "Anomali Tespiti", icon: "radar" },
  { id: "katmanlar", label: "Katmanlar", icon: "stack" },
  { id: "zaman", label: "Zaman Analizi", icon: "clock" },
  { id: "raporlar", label: "Raporlar", icon: "file" },
  { id: "ai", label: "AI Yorumlar", icon: "sparkles" },
  { id: "uyarilar", label: "Uyarılar", icon: "bell" },
  { id: "kaynaklar", label: "Veri Kaynakları", icon: "database" },
  { id: "sistem", label: "Sistem Durumu", icon: "activity" },
  { id: "ayarlar", label: "Ayarlar", icon: "settings" },
] as const

export const stats = [
  {
    id: "gozlem",
    label: "Toplam Gözlem",
    value: "12.578",
    delta: "%12.5",
    deltaLabel: "son 7 gün",
    trend: "up" as const,
    accent: "success" as const,
    icon: "satellite",
  },
  {
    id: "riskli",
    label: "Riskli Bölge",
    value: "34",
    delta: "%18.7",
    deltaLabel: "son 7 gün",
    trend: "up" as const,
    accent: "warning" as const,
    icon: "alert",
  },
  {
    id: "skor",
    label: "Ortalama Risk Skoru",
    value: "62",
    suffix: "/100",
    delta: "%8.3",
    deltaLabel: "son 7 gün",
    trend: "up" as const,
    accent: "primary" as const,
    icon: "gauge",
  },
]

export const trendData = [
  { gun: "07 Haz", skor: 12 },
  { gun: "08 Haz", skor: 28 },
  { gun: "09 Haz", skor: 55 },
  { gun: "10 Haz", skor: 48 },
  { gun: "11 Haz", skor: 60 },
  { gun: "12 Haz", skor: 74 },
  { gun: "13 Haz", skor: 58 },
  { gun: "14 Haz", skor: 78 },
]

export const regionRisk = [
  { region: "Marmara", score: 78 },
  { region: "İç Anadolu", score: 62 },
  { region: "Karadeniz", score: 58 },
  { region: "D.Anadolu", score: 46 },
  { region: "Ege", score: 45 },
  { region: "Akdeniz", score: 35 },
  { region: "G.Doğu Anadolu", score: 30 },
  { region: "G.Anadolu", score: 40 },
]

export const anomalies = [
  {
    id: 1,
    title: "Orman Yangını Riski Yüksek",
    place: "Antalya - Manavgat",
    time: "12:30",
    severity: "yuksek" as Severity,
    icon: "flame",
  },
  {
    id: 2,
    title: "Ani Su Yükselmesi Tespit Edildi",
    place: "Düzce - Akçakoca",
    time: "11:45",
    severity: "orta" as Severity,
    icon: "waves",
  },
  {
    id: 3,
    title: "Bitki Sağlığı Anomalisi",
    place: "Konya - Ereğli",
    time: "10:15",
    severity: "orta" as Severity,
    icon: "sprout",
  },
  {
    id: 4,
    title: "Bulutluluk Oranı Anomalisi",
    place: "Sinop - Boyabat",
    time: "09:30",
    severity: "dusuk" as Severity,
    icon: "cloud",
  },
]

export const layers = [
  { id: "ndvi", label: "NDVI", color: "var(--success)", active: true },
  { id: "sicaklik", label: "Sıcaklık", color: "var(--warning)", active: true },
  { id: "yangin", label: "Yangın Riski", color: "var(--danger)", active: true },
  { id: "nem", label: "Nem", color: "var(--chart-5)", active: false },
  { id: "bulut", label: "Bulutluluk", color: "var(--muted-foreground)", active: false },
  { id: "su", label: "Su Yüzeyi", color: "var(--chart-5)", active: false },
]

export const systemServices = [
  { label: "Veri Akışı", status: "Aktif" },
  { label: "İşleme Motoru", status: "Aktif" },
  { label: "AI Modelleri", status: "Aktif" },
  { label: "Depolama", status: "Aktif" },
  { label: "Uydu Bağlantısı", status: "Aktif" },
]

export const severityLabel: Record<Severity, string> = {
  yuksek: "YÜKSEK",
  orta: "ORTA",
  dusuk: "DÜŞÜK",
}
