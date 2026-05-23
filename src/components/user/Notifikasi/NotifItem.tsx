"use client";

interface Notif {
  id: string;
  judul: string;
  deskripsi: string;
  waktu: string;
  dibaca: boolean;
}

interface Props {
  notif: Notif;
  onRead: (id: string) => void;
}

export default function NotifItem({ notif, onRead }: Props) {
  return (
    <div
      onClick={() => onRead(notif.id)}
      className={`px-4 py-[14px] cursor-pointer ${notif.dibaca ? "bg-white" : "bg-[#FFF8F4]"}`}
    >
      <div className="flex justify-between mb-1">
        <p className="text-[0.82rem] font-semibold m-0 text-[#1a0e08]">{notif.judul}</p>
        <span className="text-[0.65rem] text-[#a8856b]">{notif.waktu}</span>
      </div>
      <p className="text-[0.74rem] text-[#8a6f5e] m-0 leading-[1.5]">{notif.deskripsi}</p>
    </div>
  );
}