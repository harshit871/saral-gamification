
export default function HoverTooltip({ message, children }) {
  if (!message) return <>{children}</>

  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+8px)] z-50 hidden group-hover:block pointer-events-none w-max max-w-[200px] md:max-w-xs">
        <div className="relative bg-gray-900 text-white text-xs px-3 py-2 rounded-lg text-center shadow-lg whitespace-normal leading-[1.4]">
          {message}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      </div>
    </div>
  )
}
