/**
 * Tooltip — dark nudge bubble.
 *
 * Wraps a disabled button to show a tooltip on hover.
 * The wrapper itself must be `relative` and contain both the button and this tooltip.
 *
 * Usage:
 *   <HoverTooltip message="…">
 *     <Button disabled … />
 *   </HoverTooltip>
 */
export default function HoverTooltip({ message, children }) {
  if (!message) return <>{children}</>

  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+8px)] z-50 hidden group-hover:block pointer-events-none">
        <div className="relative bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
          {message}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      </div>
    </div>
  )
}
