import AppLayout from "@/components/layout/AppLayout"
import GamificationPage from "@/pages/GamificationPage"
import RewardModal from "@/components/modal/RewardModal"

export default function App() {
  return (
    <AppLayout>
      <GamificationPage />
      <RewardModal />
    </AppLayout>
  )
}
