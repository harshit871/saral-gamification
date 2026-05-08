import { useDispatch } from "react-redux"
import Button from "@/components/ui/Button"
import { openModal } from "@/store/gamificationSlice"
import FEATURE_CARDS from "@/constants/featureCards"
import FeatureCard from "@/components/layout/FeatureCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DATA_NOT_FOUND, TABS } from "@/constants/miscellaneous"

export default function GamificationPage() {
  const dispatch = useDispatch()

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="gamify">
        <TabsList variant="line">
          {TABS.map(({ value, label }) => (
            <TabsTrigger key={value} value={value} className="text-text-primary data-[state=active]:text-brand-500 cursor-pointer">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map(({ value }) => {
          if (value === "gamify") {
            return (<TabsContent value="gamify">
              <div className="sm:mt-4 gamifyBg">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 px-0 md:px-4">
                  {FEATURE_CARDS.map((card) => (
                    <FeatureCard key={card.title} {...card} />
                  ))}
                </div>
              </div>
            </TabsContent>
            )
          }

          return <TabsContent key={value} value={value}>
            {DATA_NOT_FOUND}
          </TabsContent>
        })}
      </Tabs>
    </div>
  )
}
