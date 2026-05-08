import Sidebar from "./Sidebar"
import TopBar from "./TopBar"

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <Sidebar />

      <div className="md:ml-52 flex flex-col min-h-screen pb-16 md:pb-0 bg-surface">
        <TopBar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
