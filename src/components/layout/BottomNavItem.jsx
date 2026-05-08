
function BottomNavItem({ icon: Icon, label, active }) {
    return (
        <a
            href="#"
            className={`
        flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-[10px] font-medium
        transition-colors duration-150
        ${active ? "text-brand-500" : "text-text-muted hover:text-text-secondary"}
      `}
        >
            <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
            <span>{label}</span>
        </a>
    )
}

export default BottomNavItem;