export default function Tooltip({ message, visible }) {
  if (!visible || !message) return null

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+8px)] z-50">
      <div className="relative bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
        {message}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
      </div>
    </div>
  )
}
