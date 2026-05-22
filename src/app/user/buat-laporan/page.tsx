"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Camera,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  initial: {
    nama: string;
    email: string;
    avatarUrl?: string | null;
    inisial: string;
  };
  onSave: (data: {
    nama: string;
    email: string;
    password?: string;
    avatar?: File;
  }) => Promise<void>;
}

export default function EditProfileModal({
  open,
  onClose,
  initial,
  onSave,
}: Props) {
  const [nama, setNama] = useState(initial.nama);
  const [email, setEmail] = useState(initial.email);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [avatarFile, setAvatarFile] =
    useState<File | null>(null);

  const [avatarPreview, setAvatarPreview] =
    useState<string | null>(
      initial.avatarUrl ?? null
    );

  const [saving, setSaving] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setNama(initial.nama);
      setEmail(initial.email);
      setPassword("");
      setAvatarFile(null);
      setAvatarPreview(
        initial.avatarUrl ?? null
      );
    }
  }, [
    open,
    initial.nama,
    initial.email,
    initial.avatarUrl,
  ]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener(
      "keydown",
      handler
    );

    return () =>
      document.removeEventListener(
        "keydown",
        handler
      );
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pickAvatar = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatarFile(file);

    setAvatarPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = async () => {
    if (!nama.trim() || !email.trim())
      return;

    try {
      setSaving(true);

      await onSave({
        nama: nama.trim(),
        email: email.trim(),
        ...(password
          ? { password }
          : {}),
        ...(avatarFile
          ? { avatar: avatarFile }
          : {}),
      });

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
        >
          <motion.div
            initial={{
              scale: 0.96,
              opacity: 0,
              y: 12,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.96,
              opacity: 0,
              y: 12,
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
            className="w-full max-w-[480px] overflow-hidden rounded-[20px] bg-white shadow-2xl"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-[#f5ede3] px-6 py-5">
              <div>
                <h2 className="font-['Syne'] text-[1.05rem] font-extrabold tracking-[-0.02em] text-[#1a0e08]">
                  Edit Profil
                </h2>

                <p className="mt-1 text-[0.72rem] text-[#a8856b]">
                  Perbarui informasi akun kamu
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-1 text-[#a8856b] transition hover:text-[#1a0e08]"
              >
                <X size={19} />
              </button>
            </div>

            {/* BODY */}
            <div className="flex flex-col gap-5 p-6">
              {/* AVATAR */}
              <div className="flex justify-center">
                <div className="relative inline-block">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#f0e6dc] bg-gradient-to-br from-[#FF6B35] to-[#E8541C] shadow-lg">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="font-['Syne'] text-2xl font-extrabold text-white">
                        {initial.inisial}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      fileRef.current?.click()
                    }
                    className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#FF6B35] to-[#E8541C] transition hover:scale-110"
                  >
                    <Camera
                      size={12}
                      color="white"
                    />
                  </button>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={pickAvatar}
                  />
                </div>
              </div>

              {/* NAMA */}
              <div>
                <label className="mb-2 block text-[0.72rem] font-bold text-[#3d2817]">
                  Nama lengkap
                </label>

                <input
                  type="text"
                  value={nama}
                  onChange={(e) =>
                    setNama(e.target.value)
                  }
                  placeholder="Nama lengkap"
                  className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35]"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-[0.72rem] font-bold text-[#3d2817]">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="email@example.com"
                  className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35]"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-[0.72rem] font-bold text-[#3d2817]">
                  Password baru

                  <span className="ml-1 font-normal text-[#a8856b]">
                    (kosongkan jika tidak diubah)
                  </span>
                </label>

                <div className="relative">
                  <input
                    type={
                      showPw
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    placeholder="••••••••"
                    className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 pr-11 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPw((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a8856b]"
                  >
                    {showPw ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 border-t border-[#f5ede3] bg-[#fafaf8] px-6 py-4">
              <button
                onClick={onClose}
                className="rounded-xl border border-[#f0e6dc] bg-white px-5 py-2.5 text-sm font-semibold text-[#3d2817] transition hover:bg-[#fafaf8]"
              >
                Batal
              </button>

              <button
                onClick={handleSubmit}
                disabled={
                  saving ||
                  !nama.trim() ||
                  !email.trim()
                }
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E8541C] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-[1px] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving && (
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />
                )}

                {saving
                  ? "Menyimpan..."
                  : "Simpan"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}