function SideNavItem({ icon: Icon, label, active }) {
    return (
        <li>
            <a
                href="#"
                className={`
          flex items-center gap-2 p-2 rounded-lg text-sm font-medium
          transition-colors duration-150
          ${active
                        ? "text-brand-500 bg-brand-50"
                        : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
                    }
        `}
            >
                <Icon />
                <span>{label}</span>
            </a>
        </li>
    )
}

export default SideNavItem;