export default function Toggle({ checked, onChange, id }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer
        rounded-full border-2 border-transparent
        transition-colors duration-200 ease-in-out
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500
        ${checked ? "bg-brand-500" : "bg-gray-200"}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 rounded-full
          bg-white shadow-lg ring-0
          transition-transform duration-200 ease-in-out
          ${checked ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  )
}
