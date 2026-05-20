"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

import ExploreHeader from "@/components/user/Explore/ExploreHeader";
import PostCard from "@/components/user/Explore/PostCard";
import PostModal from "@/components/user/Explore/PostModal";

import {
  type ExplorePost,
  type ExploreKategori,
} from "@/components/user/Explore/types";

import { getReports, type Report } from "@/lib/reports";

function mapCategory(category: string): Exclude<ExploreKategori, "all"> {
  switch (category.toLowerCase()) {
    case "infrastruktur":
      return "infrastruktur";

    case "fasilitas umum":
      return "fasilitas-umum";

    case "kebersihan":
      return "kebersihan";

    case "lalu lintas":
      return "lalu-lintas";

    default:
      return "infrastruktur";
  }
}

function getInitial(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatTime(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function mapReportToPost(report: Report): ExplorePost {
  return {
    id: String(report.id),

    judul: report.title,

    deskripsi: report.description,

    kategori: mapCategory(report.category_name),

    status: report.status,

    imageUrl: report.image_url,

    pelapor: {
      nama: report.user_name,
      inisial: getInitial(report.user_name),
    },

    lokasi: report.location || "Lokasi tidak diketahui",

    createdAt: formatTime(report.created_at),

    // sementara dummy
    upvote: 0,
    komentarCount: 0,
  };
}

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState<ExploreKategori>("all");

  const [selected, setSelected] = useState<ExplorePost | null>(null);

  const [posts, setPosts] = useState<ExplorePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);

        const reports = await getReports();

        const mapped = reports.map(mapReportToPost);

        setPosts(mapped);
      } catch (error) {
        console.error("Failed fetch explore reports:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  const filtered = useMemo(() => {
    let result = [...posts];

    if (kategori !== "all") {
      result = result.filter((p) => p.kategori === kategori);
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter(
        (p) =>
          p.judul.toLowerCase().includes(q) ||
          p.deskripsi.toLowerCase().includes(q) ||
          p.lokasi.toLowerCase().includes(q) ||
          p.pelapor.nama.toLowerCase().includes(q)
      );
    }

    return result;
  }, [search, kategori, posts]);

  return (
    <div
      style={{
        padding: "28px 24px 72px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <ExploreHeader
        search={search}
        onSearch={(v) => setSearch(v)}
        kategori={kategori}
        onKategori={(v) => {
          setKategori(v);
        }}
        totalCount={filtered.length}
      />

      {loading ? (
        <div
          style={{
            background: "white",
            border: "0.5px solid #f0e6dc",
            borderRadius: 14,
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <p>Loading laporan...</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: "white",
                border: "0.5px solid #f0e6dc",
                borderRadius: 14,
                padding: "80px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "rgba(255,107,53,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                }}
              >
                <Search size={22} color="#E8541C" strokeWidth={1.8} />
              </div>

              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#1a0e08",
                  marginBottom: 5,
                }}
              >
                Tidak ada laporan ditemukan
              </p>

              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#a8856b",
                }}
              >
                Coba ubah kata kunci atau kategori
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 14,
              }}
            >
              {filtered.map((post, i) => (
                <PostCard
                  key={post.id}
                  post={post}
                  index={i}
                  onClick={setSelected}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <PostModal
        post={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}