"use client";

import NotifItem from "./NotifItem";
import { staggerClass } from "@/lib/stagger";
import { cn } from "@/lib/utils";

export type NotifGrup = "laporan" | "sosial" | "sistem";

export interface Notif {
  id: string;
  judul: string;
  deskripsi: string;
  waktu: string;
  dibaca: boolean;
}

const GRUP_CONFIG = {
  laporan: { label: "Laporan" },
  sosial: { label: "Sosial" },
  sistem: { label: "Sistem" },
};

interface Props {
  grup: NotifGrup;
  notifs: Notif[];
  index: number;
  onRead: (id: string) => void;
}

export default function NotifGroup({ grup, notifs, index, onRead }: Props) {
  const cfg = GRUP_CONFIG[grup];
  const unread = notifs.filter((n) => !n.dibaca).length;

  return (
    <div className={cn("animate-fade-slide-up-sm opacity-0", staggerClass(index))}>
      <div className="pt-[18px] pb-2 px-1 flex items-center gap-[7px]">
        <p className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-[#a8856b] m-0">
          {cfg.label}
        </p>
        {unread > 0 && (
          <span className="text-[0.6rem] font-bold bg-[#FF6B35] text-white px-[6px] py-px rounded-full">
            {unread}
          </span>
        )}
      </div>

      <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] overflow-hidden">
        {notifs.map((n, i) => (
          <div key={n.id} className={i < notifs.length - 1 ? "border-b-[0.5px] border-[#f5ede3]" : ""}>
            <NotifItem notif={n} onRead={onRead} />
          </div>
        ))}
      </div>
    </div>
  );
}
