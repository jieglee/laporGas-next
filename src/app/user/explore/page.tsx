"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import ExploreHeader from "@/components/user/Explore/ExploreHeader";
import PostCard from "@/components/user/Explore/PostCard";
import PostModal from "@/components/user/Explore/PostModal";
import { type ExplorePost, type ExploreKategori, MOCK_POSTS } from "@/components/user/Explore/types";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState<ExploreKategori>("all");
  const [selected, setSelected] = useState<ExplorePost | null>(null);

  const filtered = useMemo(() => {
    let result = [...MOCK_POSTS];

    if (kategori !== "all") result = result.filter((p) => p.kategori === kategori);

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
  }, [search, kategori]);

  return (
    <div style={{ padding: "28px 24px 72px", maxWidth: 1200, margin: "0 auto" }}>
      <ExploreHeader
        search={search}
        onSearch={(v) => setSearch(v)}
        kategori={kategori}
        onKategori={(v) => { setKategori(v); }}
        totalCount={filtered.length}
      />

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
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a0e08", marginBottom: 5 }}>
              Tidak ada laporan ditemukan
            </p>
            <p style={{ fontSize: "0.78rem", color: "#a8856b" }}>
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

      <PostModal post={selected} onClose={() => setSelected(null)} />
    </div>
  );
}