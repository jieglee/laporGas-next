export interface FormState {
  title: string;
  description: string;
  category_id: string;
  location: string;
  priority: string;
  latitude: string;
  longitude: string;
  images: File[];
}

export const CATEGORIES = [
  { id: "1", label: "Infrastruktur",  icon: "🏗️" },
  { id: "2", label: "Fasilitas Umum", icon: "🏛️" },
  { id: "3", label: "Kebersihan",     icon: "🧹" },
  { id: "4", label: "Lalu Lintas",    icon: "🚦" },
];

export const PRIORITIES = [
  { value: "low",    label: "Rendah", desc: "Tidak mendesak",      color: "#6B7280" },
  { value: "medium", label: "Sedang", desc: "Butuh perhatian",     color: "#92400E" },
  { value: "high",   label: "Tinggi", desc: "Segera ditangani",    color: "#C2410C" },
  { value: "urgent", label: "Urgent", desc: "Darurat / berbahaya", color: "#B91C1C" },
];