import { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ChevronDown, ChevronUp, Check, Pencil } from "lucide-react"
import Button from "@/components/ui/Button"
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

  /*
   * Live display label — updates as the user types.
   * Shows the formatted label whenever we have enough data,
   * regardless of whether it's been saved yet.
   */
  const displayLabel = (() => {
    if (!selectedOption) return null

    if (selectedOption.id === "posts_period") {
      if (eventValue || eventDuration) {
        return selectedOption.getDisplayLabel(
          eventValue || "X",
          eventDuration
        )
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

  /* Can the current selection be saved? */
  const canSave = (() => {
    if (!selectedEventId) return false
    if (!selectedOption?.requiresInput) return true
    if (selectedOption.inputType === "dollar") return !!eventValue
    if (selectedOption.inputType === "posts_period")
      return !!eventValue && !!eventDuration
    return true
  })()

  /* Tooltip message for the inline Save button */
  const tooltipMsg = (() => {
    if (!selectedEventId) return null
    if (selectedOption?.inputType === "dollar" && !eventValue)
      return "Enter the sales target amount to continue"
    if (
      selectedOption?.inputType === "posts_period" &&
      (!eventValue || !eventDuration)
    )
      return "Enter the count and select a duration to continue"
    return null
  })()

  /* Sanitise input — only positive integers */
  const handleNumericInput = (e) => {
    const raw = e.target.value
    /* Strip anything that isn't a digit */
    const sanitised = raw.replace(/[^0-9]/g, "")
    dispatch(setEventValue(sanitised))
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-text-primary mb-1.5">
        Reward event <span className="text-brand-500">*</span>
      </label>

      {/* Trigger */}
      <button
        id="event-dropdown-trigger"
        type="button"
        onClick={() =>
          isEventSaved ? dispatch(editEvent()) : dispatch(toggleEventDropdown())
        }
        className={`
          group w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm
          transition-colors duration-150 cursor-pointer
          ${
            isEventDropdownOpen
              ? "border-brand-500 ring-1 ring-brand-500"
              : "border-border hover:border-gray-300"
          }
        `}
      >
        <span className={displayLabel ? "text-text-primary" : "text-text-muted"}>
          {displayLabel || "Select an event"}
        </span>
        <span className="flex items-center gap-1">
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

      {/* Dropdown panel */}
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

                {/* Dollar amount input (Cross $X in sales) */}
                {isSelected && option.inputType === "dollar" && (
                  <div className="px-3 pb-2.5">
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
                        className="flex-1 py-2 pr-3 text-sm bg-transparent outline-none text-text-primary placeholder:text-text-muted"
                      />
                    </div>
                  </div>
                )}

                {/* Posts X times every Y period — dual input */}
                {isSelected && option.inputType === "posts_period" && (
                  <div className="px-3 pb-2.5 flex items-center gap-2">
                    <div className="flex items-center border border-brand-300 rounded-lg overflow-hidden bg-brand-50/30 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 w-24">
                      <input
                        ref={inputRef}
                        type="text"
                        inputMode="numeric"
                        value={eventValue}
                        onChange={handleNumericInput}
                        placeholder={option.inputPlaceholder}
                        className="w-full py-2 px-3 text-sm bg-transparent outline-none text-text-primary placeholder:text-text-muted"
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
                            selectedDuration
                              ? "text-text-primary"
                              : "text-text-muted"
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
                              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer transition-colors"
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

          {/* Footer inside dropdown: Cancel + Save */}
          <div className="relative flex items-center justify-end gap-3 px-3 py-3 border-t border-border">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => dispatch(cancelEvent())}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={!canSave}
              onClick={() => dispatch(saveEvent())}
            >
              Save
            </Button>

            {!canSave && tooltipMsg && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+8px)] z-50">
                <div className="relative bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                  {tooltipMsg}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
