export const DURATION_OPTIONS = [
  { id: "14_days", label: "14 days" },
  { id: "1_month", label: "1 month" },
  { id: "2_months", label: "2 months" },
  { id: "3_months", label: "3 months" },
  { id: "1_year", label: "1 year" },
]

export const COMMISSION_TIERS = [
  { id: "tier_1", label: "Tier Name Here" },
  { id: "tier_2", label: "Tier Name Here" },
  { id: "tier_3", label: "Tier Name Here" },
  { id: "tier_4", label: "Tier Name Here" },
  { id: "tier_5", label: "Tier Name Here" },
]

export const EVENT_OPTIONS = [
  {
    id: "cross_sales",
    label: "Cross $X in sales",
    requiresInput: true,
    inputType: "dollar",
    inputPrefix: "$",
    inputPlaceholder: "e.g. 100",
    getDisplayLabel: (value) => `Cross $${value} in sales`,
  },
  {
    id: "posts_period",
    label: "Posts X times every Y period",
    requiresInput: true,
    inputType: "posts_period",
    inputPlaceholder: "e.g. 4",
    getDisplayLabel: (value, duration) => {
      const dur = DURATION_OPTIONS.find((d) => d.id === duration)
      return `Posts ${value} times every ${dur?.label || "Y period"}`
    },
  },
  {
    id: "is_onboarded",
    label: "Is Onboarded",
    requiresInput: false,
    getDisplayLabel: () => "Is Onboarded",
  },
]

export const REWARD_OPTIONS = [
  {
    id: "flat_bonus",
    label: "Flat $X bonus",
    requiresInput: true,
    inputType: "dollar",
    inputPrefix: "$",
    inputPlaceholder: "e.g. 100",
    getDisplayLabel: (value) => `Flat $${value} Bonus`,
  },
  {
    id: "upgrade_commission",
    label: "Upgrade Commission Tier",
    requiresInput: false,
    inputType: "tier_select",
    getDisplayLabel: (_value, _dur, tierLabel) =>
      `Upgrade to (${tierLabel || "Tier Name Here"})`,
  },
]
