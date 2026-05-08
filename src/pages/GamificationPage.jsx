import { useDispatch } from "react-redux"
import Button from "@/components/ui/Button"
import { openModal } from "@/store/gamificationSlice"
import FEATURE_CARDS from "@/constants/featureCards"

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-xl border border-border-purple p-5 md:p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
      <div className="bg-magenta-secondary p-2.5 rounded-xl mb-3 md:mb-4">
        <div className="w-12 h-12 md:w-13 md:h-13 rounded-lg border-dashed border-brand-200 flex items-center justify-center bg-surface">
          <Icon size={20} className="text-magenta-tertiary" />
        </div>
      </div>

      <h3 className="text-base font-medium text-text-primary mb-2">{title}</h3>

      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
    </div>
  )
}

export default function GamificationPage() {
  const dispatch = useDispatch()

  return (
    <div className="max-w-4xl sm:mt-4 mx-auto gamifyBg">
      <div className="relative flex flex-col items-center py-10 md:pt-15 md:pb-10 px-6 md:px-8">
        <h2 className="text-xl md:text-[1.75rem] font-semibold text-magenta-primary mb-2 text-center">
          Gamify your Campaign
        </h2>

        <p className="text-base text-text-secondary mb-6 max-w-xs text-center">
          Enable gamification to start crafting your custom reward system.
        </p>

        <Button
          id="enable-gamification-btn"
          onClick={() => dispatch(openModal())}
          className="w-full md:max-w-74"
        >
          Enable Gamification
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 px-0 md:px-4">
        {FEATURE_CARDS.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  )
}
