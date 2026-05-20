export const STATUS_STYLE: Record<
  string,
  {
    bg: string;
    color: string;
  }
> = {
  pending: {
    bg: "#FEF3C7",
    color: "#D97706",
  },

  approved: {
    bg: "#DBEAFE",
    color: "#2563EB",
  },

  rejected: {
    bg: "#FEE2E2",
    color: "#DC2626",
  },

  on_progress: {
    bg: "#E0E7FF",
    color: "#4F46E5",
  },

  completed: {
    bg: "#DCFCE7",
    color: "#16A34A",
  },
};

export function fmtUpvote(num: number) {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }

  return String(num);
}