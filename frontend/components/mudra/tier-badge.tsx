import { cn } from "@/lib/utils"
import { TIERS, type Tier } from "@/lib/mudra/guide"

const styles: Record<Tier, { pill: string; dot: string }> = {
  reliable: {
    pill: "bg-emerald-100 text-emerald-900 ring-emerald-300/60 dark:bg-emerald-950/60 dark:text-emerald-200 dark:ring-emerald-700/50",
    dot: "bg-emerald-500",
  },
  good: {
    pill: "bg-amber-100 text-amber-900 ring-amber-300/60 dark:bg-amber-950/60 dark:text-amber-200 dark:ring-amber-700/50",
    dot: "bg-amber-500",
  },
  experimental: {
    pill: "bg-orange-100 text-orange-900 ring-orange-300/60 dark:bg-orange-950/60 dark:text-orange-200 dark:ring-orange-700/50",
    dot: "bg-orange-500",
  },
}

export function TierBadge({ tier, className }: { tier: Tier; className?: string }) {
  return (
    <span
      title={TIERS[tier].summary}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles[tier].pill,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", styles[tier].dot)} aria-hidden />
      {TIERS[tier].label}
    </span>
  )
}
