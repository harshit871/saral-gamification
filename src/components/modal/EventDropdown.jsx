import { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import {
  toggleEventDropdown,
  selectEvent,
  setEventValue,
} from "@/store/gamificationSlice"
import { EVENT_OPTIONS } from "@/constants/rewardOptions"

export default function EventDropdown() {
  const dispatch = useDispatch()
  const { selectedEventId, eventValue, isEventDropdownOpen, isEventSaved } =
    useSelector((state) => state.gamification)

  const inputRef = useRef(null)
  const selectedOption = EVENT_OPTIONS.find((o) => o.id === selectedEventId)

  /* Auto-focus the value input when an option requiring input is selected */
  useEffect(() => {
    if (selectedOption?.requiresInput && isEventDropdownOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedEventId, isEventDropdownOpen, selectedOption?.requiresInput])

  const displayLabel =
    isEventSaved && selectedOption
      ? selectedOption.getDisplayLabel(eventValue)
      : selectedOption
        ? selectedOption.label
        : null

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-text-primary mb-1.5">
        Reward event <span className="text-brand-500">*</span>
      </label>

      {/* Trigger */}
      <button
        id="event-dropdown-trigger"
        type="button"
        onClick={() => dispatch(toggleEventDropdown())}
        className={`
          w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm
          transition-colors duration-150 cursor-pointer
          ${
            isEventDropdownOpen
              ? "border-brand-500 ring-1 ring-brand-500"
              : isEventSaved
                ? "border-border bg-white"
                : "border-border hover:border-gray-300"
          }
        `}
      >
        <span className={displayLabel ? "text-text-primary" : "text-text-muted"}>
          {displayLabel || "Select an event"}
        </span>
        {isEventDropdownOpen ? (
          <ChevronUp size={16} className="text-text-muted" />
        ) : (
          <ChevronDown size={16} className="text-text-muted" />
        )}
      </button>

      {/* Dropdown panel */}
      {isEventDropdownOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-lg z-20 overflow-hidden">
          {EVENT_OPTIONS.map((option) => {
            const isSelected = selectedEventId === option.id
            return (
              <div key={option.id}>
                <button
                  type="button"
                  onClick={() => dispatch(selectEvent(option.id))}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 text-sm text-left
                    transition-colors duration-100 cursor-pointer
                    ${
                      isSelected
                        ? "text-brand-500 bg-brand-50/50"
                        : "text-text-primary hover:bg-gray-50"
                    }
                  `}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check size={16} className="text-brand-500" />}
                </button>

                {/* Inline value input */}
                {isSelected && option.requiresInput && (
                  <div className="px-3 pb-2.5">
                    <div className="flex items-center border border-brand-300 rounded-lg overflow-hidden bg-brand-50/30 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                      <span className="pl-3 pr-1 text-sm text-text-secondary">
                        {option.inputPrefix}
                      </span>
                      <input
                        ref={inputRef}
                        type="number"
                        value={eventValue}
                        onChange={(e) =>
                          dispatch(setEventValue(e.target.value))
                        }
                        placeholder={option.inputPlaceholder}
                        className="flex-1 py-2 pr-3 text-sm bg-transparent outline-none text-text-primary placeholder:text-text-muted [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
