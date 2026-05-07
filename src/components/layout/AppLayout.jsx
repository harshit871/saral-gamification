import Sidebar from "./Sidebar"
import TopBar from "./TopBar"

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <Sidebar />

      <div className="ml-52 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
