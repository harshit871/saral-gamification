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
    <div className="bg-white rounded-xl border border-border p-5 md:p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-dashed border-brand-200 flex items-center justify-center mb-3 md:mb-4 bg-brand-50">
        <Icon size={22} className="text-brand-500" />
      </div>
      <h3 className="text-sm font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
    </div>
  )
}

export default function GamificationPage() {
  const dispatch = useDispatch()

  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero section */}
      <div className="relative bg-white rounded-2xl border border-border overflow-hidden mb-6 md:mb-8">
        {/* Decorative dashed borders — hidden on very small screens to avoid clutter */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          <div className="absolute top-6 left-6 w-24 h-20 border-2 border-dashed border-brand-100 rounded-xl" />
          <div className="absolute top-4 right-8 w-20 h-16 border-2 border-dashed border-brand-100 rounded-xl" />
          <div className="absolute top-12 right-24 w-16 h-14 border-2 border-dashed border-brand-200 rounded-xl bg-brand-50/30" />
          <div className="absolute bottom-16 left-10 w-14 h-12 border-2 border-dashed border-brand-100 rounded-xl" />
          <div className="absolute bottom-8 right-12 w-16 h-14 border-2 border-dashed border-brand-100 rounded-xl" />
        </div>

        <div className="relative flex flex-col items-center py-10 md:py-16 px-6 md:px-8">
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-2 italic text-center">
            Gamify your Campaign
          </h2>
          <p className="text-sm text-text-secondary mb-6 max-w-xs text-center">
            Enable gamification to start crafting your custom reward system.
          </p>
          <Button
            id="enable-gamification-btn"
            size="lg"
            onClick={() => dispatch(openModal())}
            className="w-full sm:w-auto"
          >
            Enable Gamification
          </Button>
        </div>
      </div>

      {/* Feature cards — single column on mobile, 3 columns on md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {FEATURE_CARDS.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  )
}
