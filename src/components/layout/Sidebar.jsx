import {
  Home,
  BarChart3,
  Gamepad2,
  LayoutGrid,
  CreditCard,
  Settings,
} from "lucide-react"

const NAV_ITEMS = [
  { icon: Home, label: "Home" },
  { icon: BarChart3, label: "Insights" },
  { icon: Gamepad2, label: "Gamification", active: true },
  { icon: LayoutGrid, label: "Applications" },
  { icon: CreditCard, label: "Payments" },
]

function NavItem({ icon: Icon, label, active }) {
  return (
    <li>
      <a
        href="#"
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
          transition-colors duration-150
          ${
            active
              ? "text-brand-500 bg-brand-50 border-l-3 border-brand-500"
              : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
          }
        `}
      >
        <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
        <span>{label}</span>
      </a>
    </li>
  )
}

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-52 bg-white border-r border-border flex flex-col z-30">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">◆</span>
        </div>
        <span className="text-base font-bold tracking-wide text-text-primary">
          SATHI
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-2">
        <ul className="space-y-1 list-none p-0 m-0">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </ul>
      </nav>

      {/* Settings */}
      <div className="px-3 pb-5">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-colors duration-150"
        >
          <Settings size={18} strokeWidth={1.8} />
          <span>Settings</span>
        </a>
      </div>
    </aside>
  )
}
