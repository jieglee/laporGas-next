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
  { id: "1", label: "Infrastruktur" },
  { id: "2", label: "Fasilitas Umum" },
  { id: "3", label: "Kebersihan" },
  { id: "4", label: "Lalu Lintas" },
];

export const PRIORITIES = [
  {
    value: "low",
    label: "Rendah",
    desc: "Tidak mendesak",
    dot: "bg-gray-500",
    active: "bg-gray-500/10 border-gray-500/55 text-gray-600",
    hover: "hover:border-gray-500/40",
  },
  {
    value: "medium",
    label: "Sedang",
    desc: "Butuh perhatian",
    dot: "bg-amber-700",
    active: "bg-amber-700/10 border-amber-700/55 text-amber-800",
    hover: "hover:border-amber-700/40",
  },
  {
    value: "high",
    label: "Tinggi",
    desc: "Segera ditangani",
    dot: "bg-orange-700",
    active: "bg-orange-700/10 border-orange-700/55 text-orange-800",
    hover: "hover:border-orange-700/40",
  },
  {
    value: "urgent",
    label: "Urgent",
    desc: "Darurat / berbahaya",
    dot: "bg-red-700",
    active: "bg-red-700/10 border-red-700/55 text-red-800",
    hover: "hover:border-red-700/40",
  },
] as const;