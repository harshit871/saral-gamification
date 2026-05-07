import { Bell } from "lucide-react"

export default function TopBar() {
  return (
    <header className="h-14 bg-white border-b border-border flex items-center justify-between px-4 md:px-6">
      {/* Logo mark visible only on mobile (sidebar logo is hidden) */}
      <div className="flex items-center gap-3">
        <div className="flex md:hidden items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">◆</span>
          </div>
          <span className="text-sm font-bold tracking-wide text-text-primary">
            SATHI
          </span>
        </div>

        <h1 className="text-base md:text-lg font-semibold text-text-primary m-0">
          Gamification
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150">
          <Bell size={18} className="text-text-secondary" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center overflow-hidden">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=saral"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
