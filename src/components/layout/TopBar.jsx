import { Bell } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function TopBar() {
  return (
    <header className="h-14 border-b border-border px-4 md:px-6 flex justify-center">
      <div className="flex items-center justify-between w-4xl">

        <div className="flex items-center gap-3">
          <div className="flex md:hidden items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-linear-to-br from-red-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">◆</span>
            </div>
            <span className="text-sm font-bold tracking-wide text-text-primary">
              SARAL
            </span>
          </div>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/campaign" className="text-base md:text-lg font-semibold m-0">Campaigns</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/campaign-name" className="text-base md:text-lg font-semibold m-0">Campaign Name</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-base md:text-lg font-semibold text-text-primary m-0">Campaign Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <Bell size={20} className="text-text-secondary" />
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              5
            </span>
          </button>

          <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="/src/assets/profile-avatar.png"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header >
  )
}
