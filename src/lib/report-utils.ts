export const STATUS_STYLE: Record<
  string,
  {
    badge: string;
  }
> = {
  pending: {
    badge: "bg-amber-100 text-amber-700",
  },
  approved: {
    badge: "bg-blue-100 text-blue-600",
  },
  rejected: {
    badge: "bg-red-100 text-red-600",
  },
  on_progress: {
    badge: "bg-indigo-100 text-indigo-600",
  },
  completed: {
    badge: "bg-green-100 text-green-600",
  },
};

export function fmtUpvote(num: number) {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }

  return String(num);
}
