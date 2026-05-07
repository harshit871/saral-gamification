import { useDispatch } from "react-redux"
import { Gift, Crown, Zap } from "lucide-react"
import Button from "@/components/ui/Button"
import { openModal } from "@/store/gamificationSlice"

const FEATURE_CARDS = [
  {
    icon: Gift,
    title: "Reward Your Ambassadors",
    description:
      "Boost campaign performance by setting up rewards for ambassadors",
  },
  {
    icon: Crown,
    title: "Set Milestones",
    description:
      "Set up custom goals for sales, posts, or time-based achievements",
  },
  {
    icon: Zap,
    title: "Customise Incentives",
    description:
      "Create custom incentives like flat fees, free products, or special commissions.",
  },
]

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-xl border border-border p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
      <div className="w-14 h-14 rounded-full border-2 border-dashed border-brand-200 flex items-center justify-center mb-4 bg-brand-50">
        <Icon size={24} className="text-brand-500" />
      </div>
      <h3 className="text-sm font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-xs text-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default function GamificationPage() {
  const dispatch = useDispatch()

  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero section */}
      <div className="relative bg-white rounded-2xl border border-border overflow-hidden mb-8">
        {/* Decorative dashed borders */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-6 left-6 w-24 h-20 border-2 border-dashed border-brand-100 rounded-xl" />
          <div className="absolute top-4 right-8 w-20 h-16 border-2 border-dashed border-brand-100 rounded-xl" />
          <div className="absolute top-12 right-24 w-16 h-14 border-2 border-dashed border-brand-200 rounded-xl bg-brand-50/30" />
          <div className="absolute bottom-16 left-10 w-14 h-12 border-2 border-dashed border-brand-100 rounded-xl" />
          <div className="absolute bottom-8 right-12 w-18 h-14 border-2 border-dashed border-brand-100 rounded-xl" />
        </div>

        <div className="relative flex flex-col items-center py-16 px-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-2 italic">
            Gamify your Campaign
          </h2>
          <p className="text-sm text-text-secondary mb-6 max-w-xs text-center">
            Enable gamification to start crafting your custom reward system.
          </p>
          <Button
            id="enable-gamification-btn"
            size="lg"
            onClick={() => dispatch(openModal())}
          >
            Enable Gamification
          </Button>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-3 gap-4">
        {FEATURE_CARDS.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  )
}
