import { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ChevronDown, ChevronUp, Check, Pencil } from "lucide-react"
import Button from "@/components/ui/Button"
import {
  toggleRewardDropdown,
  selectReward,
  setRewardValue,
  saveReward,
  editReward,
  cancelReward,
} from "@/store/gamificationSlice"
import { REWARD_OPTIONS, COMMISSION_TIERS } from "@/constants/rewardOptions"

export default function RewardDropdown() {
  const dispatch = useDispatch()
  const {
    selectedEventId,
    selectedRewardId,
    rewardValue,
    selectedTierId,
    isRewardDropdownOpen,
    isRewardSaved,
    isEventSaved,
  } = useSelector((state) => state.gamification)

  const inputRef = useRef(null)
  const selectedOption = REWARD_OPTIONS.find((o) => o.id === selectedRewardId)
  const selectedTier = COMMISSION_TIERS.find((t) => t.id === selectedTierId)

  /*
   * "Upgrade Commission Tier" is disabled when the event is "is_onboarded".
   * This mirrors the Figma designs where the option is greyed out.
   */
  const isTierDisabled = selectedEventId === "is_onboarded"

  useEffect(() => {
    if (
      selectedOption?.inputType === "dollar" &&
      isRewardDropdownOpen &&
      inputRef.current
    ) {
      inputRef.current.focus()
    }
  }, [selectedRewardId, isRewardDropdownOpen, selectedOption?.inputType])

  /*
   * Live display label — updates as the user types.
   */
  const displayLabel = (() => {
    if (!selectedOption) return null

    if (selectedOption.id === "upgrade_commission" && selectedTier) {
      return selectedOption.getDisplayLabel(null, null, selectedTier.label)
    }

    if (selectedOption.inputType === "dollar" && rewardValue) {
      return selectedOption.getDisplayLabel(rewardValue)
    }

    if (selectedOption.inputType === "dollar") {
      return selectedOption.label
    }

    return selectedOption.label
  })()

  /* Can the current selection be saved? (flat_bonus only — tier has its own flow) */
  const canSave = selectedRewardId === "flat_bonus" && !!rewardValue

  const tooltipMsg =
    selectedRewardId === "flat_bonus" && !rewardValue
      ? "Enter the bonus amount to continue"
      : null

  /* Sanitise — only positive integers */
  const handleNumericInput = (e) => {
    const sanitised = e.target.value.replace(/[^0-9]/g, "")
    dispatch(setRewardValue(sanitised))
  }

  /*
   * Always render the section (visible but disabled when event not saved).
   * This matches the Figma where "Reward with" is shown but non-interactive.
   */
  const isDisabled = !isEventSaved

  return (
    <div className={`relative ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}>
      <label className="block text-sm font-medium text-text-primary mb-1.5">
        Reward with <span className="text-brand-500">*</span>
      </label>

      {/* Trigger */}
      <button
        id="reward-dropdown-trigger"
        type="button"
        disabled={isDisabled}
        onClick={() =>
          isRewardSaved
            ? dispatch(editReward())
            : dispatch(toggleRewardDropdown())
        }
        className={`
          group w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm
          transition-colors duration-150
          ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
          ${
            isRewardDropdownOpen
              ? "border-brand-500 ring-1 ring-brand-500"
              : "border-border hover:border-gray-300"
          }
        `}
      >
        <span className={displayLabel && !isDisabled ? "text-text-primary" : "text-text-muted"}>
          {displayLabel || "Select a reward"}
        </span>
        <span className="flex items-center gap-1">
          {isRewardSaved && !isRewardDropdownOpen && (
            <Pencil
              size={14}
              className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}
          {isRewardDropdownOpen ? (
            <ChevronUp size={16} className="text-text-muted" />
          ) : (
            <ChevronDown size={16} className="text-text-muted" />
          )}
        </span>
      </button>

      {/* Dropdown panel */}
      {isRewardDropdownOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-lg z-20">
          {REWARD_OPTIONS.map((option) => {
            const isSelected = selectedRewardId === option.id
            const isOptionDisabled =
              option.id === "upgrade_commission" && isTierDisabled

            return (
              <div key={option.id}>
                <button
                  type="button"
                  disabled={isOptionDisabled}
                  onClick={() =>
                    !isOptionDisabled && dispatch(selectReward(option.id))
                  }
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 text-sm text-left
                    transition-colors duration-100
                    ${
                      isOptionDisabled
                        ? "text-text-muted cursor-not-allowed"
                        : isSelected
                          ? "text-brand-500 bg-brand-50/50 cursor-pointer"
                          : "text-text-primary hover:bg-gray-50 cursor-pointer"
                    }
                  `}
                >
                  <span>{option.label}</span>
                  {isSelected && !isOptionDisabled && (
                    <Check size={16} className="text-brand-500" />
                  )}
                </button>

                {/* Dollar input for flat bonus */}
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
                        value={rewardValue}
                        onChange={handleNumericInput}
                        placeholder={option.inputPlaceholder}
                        className="flex-1 py-2 pr-3 text-sm bg-transparent outline-none text-text-primary placeholder:text-text-muted"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Footer: Cancel + Save (only for flat_bonus) */}
          {selectedRewardId === "flat_bonus" && (
            <div className="relative flex items-center justify-end gap-3 px-3 py-3 border-t border-border">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => dispatch(cancelReward())}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!canSave}
                onClick={() => dispatch(saveReward())}
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
          )}
        </div>
      )}
    </div>
  )
}
