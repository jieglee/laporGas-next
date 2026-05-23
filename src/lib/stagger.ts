/** Tailwind arbitrary animation-delay classes for staggered list reveals (0–29). */
export const STAGGER_MS = Array.from({ length: 30 }, (_, i) => {
  const ms = i * 40;
  return `[animation-delay:${ms}ms]` as const;
});

export function staggerClass(index: number): string {
  return STAGGER_MS[Math.min(index, STAGGER_MS.length - 1)] ?? STAGGER_MS[0];
}
