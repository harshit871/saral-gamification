import NAV_ITEMS from "@/constants/navitems";
import Profile from "@/assets/icons/Profile";
import SideNavItem from "./SideNavItem";
import BottomNavItem from "./BottomNavItem";

export default function Sidebar() {
  return (
    <>

      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-52 flex-col p-4 z-30">

        <div className="flex items-center gap-2 px-2">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-red-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">◆</span>
          </div>
          <span className="text-base font-bold tracking-wide text-text-primary">
            SARAL
          </span>
        </div>

        <nav className="flex-1 mt-6">
          <ul className="space-y-1 list-none p-0 m-0">
            {NAV_ITEMS.map((item) => (
              <SideNavItem key={item.label} {...item} />
            ))}
          </ul>
        </nav>

        <a
          href="#"
          className="flex items-center gap-2 p-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-colors duration-150"
        >
          <Profile />
          <span>Settings</span>
        </a>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border flex items-stretch safe-area-inset-bottom">
        {NAV_ITEMS.map((item) => (
          <BottomNavItem key={item.label} {...item} />
        ))}
        <BottomNavItem icon={Profile} label="Settings" active={false} />
      </nav>
    </>
  )
}
