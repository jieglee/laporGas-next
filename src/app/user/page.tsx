import HeroSection from "@/components/user/Home/HeroSection";
import CategorySection from "@/components/user/Home/CategorySection";
import TrendingSection, { type TrendingReport } from "@/components/user/Home/Trendingsection";
import NearbySection, { type NearbyReport } from "@/components/user/Home/NearbySection";
import LaporanSelesaiSection from "@/components/landing/Laporanselesaisection";
import CtaSection from "@/components/user/Home/Ctasection";

const mockTrending: TrendingReport[] = [
  {
    id: "t1",
    title: "Macet parah tiap pagi di simpang Margonda",
    category: "Transportasi",
    location: "Margonda, Depok",
    status: "onProgress",
    upvotes: 342,
  },
  {
    id: "t2",
    title: "Pungli di terminal Depok belum tertangani",
    category: "Keamanan",
    location: "Depok Lama",
    status: "pending",
    upvotes: 287,
  },
  {
    id: "t3",
    title: "Banjir tahunan di kompleks Pesona Khayangan",
    category: "Lingkungan",
    location: "Sukmajaya, Depok",
    status: "onProgress",
    upvotes: 256,
  },
];

const mockNearby: NearbyReport[] = [
  {
    id: "n1",
    title: "Jalan rusak di kawasan Kukusan",
    category: "Infrastruktur",
    location: "Kukusan, Depok",
    distance: "250m",
    status: "approved",
    thumbnail: undefined,
    upvotes: 156,
    comments: 24,
  },
  {
    id: "n2",
    title: "Lampu jalan mati di perumahan Pesona",
    category: "Utilitas Publik",
    location: "Pesona Khayangan",
    distance: "500m",
    status: "onProgress",
    thumbnail: undefined,
    upvotes: 89,
    comments: 12,
  },
  {
    id: "n3",
    title: "Sampah menumpuk di TPS kawasan Cinere",
    category: "Lingkungan",
    location: "Cinere, Depok",
    distance: "750m",
    status: "pending",
    thumbnail: undefined,
    upvotes: 204,
    comments: 31,
  },
];

export default function UserHomePage() {
  return (
    <div className="space-y-10 px-4 py-6 md:px-8 md:py-10">
      <HeroSection />
      <NearbySection reports={mockNearby} />
      <CategorySection />
      <TrendingSection reports={mockTrending} />
      <LaporanSelesaiSection />
      <CtaSection />
    </div>
  );
}