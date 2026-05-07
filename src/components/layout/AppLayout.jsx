import Sidebar from "./Sidebar"
import TopBar from "./TopBar"

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <Sidebar />

      {/*
        - md+: offset left by sidebar width (ml-52)
        - mobile: no left offset; add bottom padding so content
          doesn't hide behind the bottom nav bar (pb-16)
      */}
      <div className="md:ml-52 flex flex-col min-h-screen pb-16 md:pb-0 bg-surface">
        <TopBar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
