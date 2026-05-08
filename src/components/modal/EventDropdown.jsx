import { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ChevronDown, ChevronUp, Check, Pencil } from "lucide-react"
import Button from "@/components/ui/Button"
import HoverTooltip from "@/components/ui/Tooltip"
import {
  toggleEventDropdown,
  selectEvent,
  setEventValue,
  setEventDuration,
  toggleDurationDropdown,
  saveEvent,
  editEvent,
  cancelEvent,
} from "@/store/gamificationSlice"
import { EVENT_OPTIONS, DURATION_OPTIONS } from "@/constants/rewardOptions"
import { sanitizeNumericInput } from "@/lib/utils"
import { MAX_LENGTH_INPUT_ALLOWED } from "@/constants/miscellaneous"

export default function EventDropdown() {
  const dispatch = useDispatch()
  const {
    selectedEventId,
    eventValue,
    eventDuration,
    isEventDropdownOpen,
    isEventSaved,
    isDurationDropdownOpen,
  } = useSelector((state) => state.gamification)

  const inputRef = useRef(null)
  const selectedOption = EVENT_OPTIONS.find((o) => o.id === selectedEventId)
  const selectedDuration = DURATION_OPTIONS.find((d) => d.id === eventDuration)

  useEffect(() => {
    if (selectedOption?.requiresInput && isEventDropdownOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedEventId, isEventDropdownOpen, selectedOption?.requiresInput])

  const displayLabel = (() => {
    if (!selectedOption) return null

    if (selectedOption.id === "posts_period") {
      if (eventValue || eventDuration) {
        return selectedOption.getDisplayLabel(eventValue || "X", eventDuration)
      }
      return selectedOption.label
    }

    if (selectedOption.inputType === "dollar" && eventValue) {
      return selectedOption.getDisplayLabel(eventValue)
    }

    if (!selectedOption.requiresInput) {
      return selectedOption.getDisplayLabel()
    }

    return selectedOption.label
  })()

  const hasValidValue = eventValue !== "" && Number(eventValue) > 0

  const canSave = (() => {
    if (!selectedEventId) return false
    if (!selectedOption?.requiresInput) return true
    if (selectedOption.inputType === "dollar") return hasValidValue
    if (selectedOption.inputType === "posts_period")
      return hasValidValue && !!eventDuration
    return true
  })()

  const tooltipMsg = (() => {
    if (!selectedEventId) return "Select an event to continue"
    if (selectedOption?.inputType === "dollar" && !hasValidValue)
      return "Enter the sales target amount to continue"
    if (selectedOption?.inputType === "posts_period") {
      if (!hasValidValue && !eventDuration)
        return "Enter the count and select a duration to continue"
      if (!hasValidValue) return "Enter a valid post count to continue"
      if (!eventDuration) return "Select a duration to continue"
    }
    return null
  })()

  const handleNumericInput = (e) => {
    const sanitised = sanitizeNumericInput(e.target.value)
    dispatch(setEventValue(sanitised))
  }

  return (
    <div className="relative">
      <label className="block text-sm text-text-primary mb-1.5">
        Reward event <span className="text-brand-500">*</span>
      </label>

      <button
        id="event-dropdown-trigger"
        type="button"
        onClick={() =>
          isEventSaved ? dispatch(editEvent()) : dispatch(toggleEventDropdown())
        }
        className={`
          group w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm
          transition-colors duration-150 cursor-pointer
          ${isEventDropdownOpen
            ? "border-brand-500 ring-1 ring-brand-500"
            : "border-border hover:border-gray-300"
          }
        `}
      >
        <span className={`text-base leading-[1.4] ${displayLabel ? "text-text-primary" : "text-text-muted"}`}>
          {displayLabel || "Select an event"}
        </span>

        <span className="flex items-center gap-1 shrink-0">
          {isEventSaved && !isEventDropdownOpen && (
            <Pencil
              size={14}
              className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}
          {isEventDropdownOpen ? (
            <ChevronUp size={16} className="text-text-muted" />
          ) : (
            <ChevronDown size={16} className="text-text-muted" />
          )}
        </span>
      </button>

      {isEventDropdownOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-lg z-20">
          {EVENT_OPTIONS.map((option) => {
            const isSelected = selectedEventId === option.id
            return (
              <div key={option.id}>
                <button
                  type="button"
                  onClick={() => dispatch(selectEvent(option.id))}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 text-sm text-left
                    transition-colors duration-100 cursor-pointer rounded-lg
                    ${isSelected
                      ? "text-brand-500 bg-brand-700"
                      : "text-text-primary hover:bg-gray-50"
                    }
                  `}
                >
                  <span className="text-base leading-[1.4]">{option.label}</span>

                  <span className="w-4 shrink-0 flex justify-center">
                    {isSelected && <Check size={16} className="text-brand-500" />}
                  </span>
                </button>

                {isSelected && option.inputType === "dollar" && (
                  <div className="my-1">
                    <div className="flex items-center border border-brand-300 rounded-lg overflow-hidden bg-brand-50/30 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                      <span className="pl-3 pr-1 text-sm text-text-secondary">
                        {option.inputPrefix}
                      </span>
                      <input
                        ref={inputRef}
                        type="text"
                        inputMode="numeric"
                        value={eventValue}
                        onChange={handleNumericInput}
                        placeholder={option.inputPlaceholder}
                        className="flex-1 py-2 pr-3 text-base leading-[1.4] bg-transparent outline-none text-text-primary placeholder:text-text-muted placeholder:text-base placeholder:leading-[1.4]"
                        maxLength={MAX_LENGTH_INPUT_ALLOWED}
                      />
                    </div>
                  </div>
                )}

                {isSelected && option.inputType === "posts_period" && (
                  <div className="px-3 pb-2.5 grid grid-cols-2 gap-2">
                    <div className="flex items-center border border-brand-300 rounded-lg overflow-hidden bg-brand-50/30 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                      <input
                        ref={inputRef}
                        type="text"
                        inputMode="numeric"
                        value={eventValue}
                        onChange={handleNumericInput}
                        placeholder={option.inputPlaceholder}
                        className="py-2 px-3 text-base leading-[1.4] bg-transparent outline-none text-text-primary placeholder:text-text-muted placeholder:text-base placeholder:leading-[1.4]"
                        maxLength={MAX_LENGTH_INPUT_ALLOWED}
                      />
                    </div>

                    <div className="relative flex-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          dispatch(toggleDurationDropdown())
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-brand-300 text-sm bg-brand-50/30 cursor-pointer"
                      >
                        <span
                          className={
                            `text-base leading-[1.4] ${selectedDuration
                              ? "text-text-primary"
                              : "text-text-muted"
                            }`
                          }
                        >
                          {selectedDuration?.label || "Select duration"}
                        </span>
                        <ChevronDown size={14} className="text-text-muted" />
                      </button>

                      {isDurationDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-lg z-30">
                          {DURATION_OPTIONS.map((dur) => (
                            <button
                              key={dur.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                dispatch(setEventDuration(dur.id))
                              }}
                              className="w-full text-left px-3 py-2 text-base leading-[1.4] hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                              {dur.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          <div className="grid grid-cols-2 gap-3 px-3 py-3 border-t border-border">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => dispatch(cancelEvent())}
            >
              Cancel
            </Button>

            <HoverTooltip message={!canSave ? tooltipMsg : null}>
              <Button
                variant="primary"
                size="sm"
                disabled={!canSave}
                onClick={() => dispatch(saveEvent())}
                className="w-full"
              >
                Save
              </Button>
            </HoverTooltip>
          </div>
        </div>
      )}
    </div>
  )
}
