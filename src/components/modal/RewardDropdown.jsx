import { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ChevronDown, ChevronUp, Check, Pencil } from "lucide-react"
import Button from "@/components/ui/Button"
import HoverTooltip from "@/components/ui/Tooltip"
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

  const isTierDisabled = ["is_onboarded", "posts_period"].includes(selectedEventId)

  useEffect(() => {
    if (
      selectedOption?.inputType === "dollar" &&
      isRewardDropdownOpen &&
      inputRef.current
    ) {
      inputRef.current.focus()
    }
  }, [selectedRewardId, isRewardDropdownOpen, selectedOption?.inputType])

  const displayLabel = (() => {
    if (!selectedOption) return null

    if (selectedOption.id === "upgrade_commission" && selectedTier) {
      return selectedOption.getDisplayLabel(null, null, selectedTier.label)
    }

    if (selectedOption.inputType === "dollar" && rewardValue) {
      return selectedOption.getDisplayLabel(rewardValue)
    }

    return selectedOption.label
  })()

  const hasValidValue = rewardValue !== "" && Number(rewardValue) > 0

  const canSave = selectedRewardId === "flat_bonus" && hasValidValue

  const tooltipMsg =
    selectedRewardId === "flat_bonus" && !hasValidValue
      ? "Enter the bonus amount to continue"
      : null

  const handleNumericInput = (e) => {
    const sanitised = e.target.value.replace(/[^0-9]/g, "")
    dispatch(setRewardValue(sanitised))
  }

  return (
    <div className="relative">
      <label className="block text-sm text-text-primary mb-1.5">
        Reward with <span className="text-brand-500">*</span>
      </label>

      <button
        id="reward-dropdown-trigger"
        type="button"
        onClick={() =>
          isRewardSaved
            ? dispatch(editReward())
            : dispatch(toggleRewardDropdown())
        }
        className={`
          group w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm
          transition-colors duration-150 cursor-pointer
          ${isRewardDropdownOpen
            ? "border-brand-500 ring-1 ring-brand-500"
            : "border-border hover:border-gray-300"
          }
        `}
      >
        <span className={`text-base leading-[1.4] ${displayLabel ? "text-text-primary" : "text-text-muted"}`}>
          {displayLabel || "Select a reward"}
        </span>

        <span className="flex items-center gap-1 shrink-0">
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
                    ${isOptionDisabled
                      ? "text-text-muted cursor-not-allowed"
                      : isSelected
                        ? "text-brand-500 bg-brand-50/50 cursor-pointer"
                        : "text-text-primary hover:bg-gray-50 cursor-pointer"
                    }
                  `}
                >
                  <span className="text-base leading-[1.4]">
                    {option.id === "upgrade_commission" && selectedTier
                      ? option.getDisplayLabel(null, null, selectedTier.label)
                      : option.label}
                  </span>

                  <span className="w-4 shrink-0 flex justify-center">
                    {isSelected && !isOptionDisabled && (
                      option.id === "upgrade_commission" && selectedTier ? (
                        <Pencil size={16} className="text-text-muted" />
                      ) : (
                        <Check size={16} className="text-brand-500" />
                      )
                    )}
                  </span>
                </button>

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
                        className="flex-1 py-2 pr-3 text-sm bg-transparent outline-none text-text-primary placeholder:text-text-muted placeholder:text-base placeholder:leading-[1.4]"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {selectedRewardId === "flat_bonus" && (
            <div className="grid grid-cols-2 gap-3 px-3 py-3 border-t border-border">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => dispatch(cancelReward())}
              >
                Cancel
              </Button>

              <HoverTooltip message={!canSave ? tooltipMsg : null}>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={!canSave}
                  onClick={() => dispatch(saveReward())}
                  className="w-full"
                >
                  Save
                </Button>
              </HoverTooltip>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
