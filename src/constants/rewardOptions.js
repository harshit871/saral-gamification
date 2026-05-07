export const EVENT_OPTIONS = [
  {
    id: "cross_sales",
    label: "Cross $X in sales",
    requiresInput: true,
    inputPrefix: "$",
    inputPlaceholder: "e.g. 100",
    getDisplayLabel: (value) => `Cross $${value} in sales`,
  },
  {
    id: "posts_period",
    label: "Posts X times every Y period",
    requiresInput: false,
    getDisplayLabel: () => "Posts X times every Y period",
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
    inputPrefix: "$",
    inputPlaceholder: "e.g. 100",
    getDisplayLabel: (value) => `Flat $${value} Bonus`,
  },
  {
    id: "upgrade_commission",
    label: "Upgrade to Y% commission",
    requiresInput: true,
    inputPrefix: "%",
    inputPlaceholder: "e.g. 10",
    getDisplayLabel: (value) => `Upgrade to ${value}% commission`,
  },
]
