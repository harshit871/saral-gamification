const VARIANTS = {
  primary:
    "bg-gradient-to-r from-brand-500 to-brand-400 text-white hover:from-brand-600 hover:to-brand-500 shadow-sm",
  secondary:
    "bg-white text-text-secondary border border-border hover:bg-gray-50",
  ghost: "bg-transparent text-text-secondary hover:bg-gray-100",
}

const SIZES = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2 text-sm",
  lg: "px-8 py-2.5 text-base",
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer select-none"
  const variantClasses = VARIANTS[variant] || VARIANTS.primary
  const sizeClasses = SIZES[size] || SIZES.md
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : ""

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
