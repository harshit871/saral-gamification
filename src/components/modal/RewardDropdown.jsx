import { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import {
  toggleRewardDropdown,
  selectReward,
  setRewardValue,
} from "@/store/gamificationSlice"
import { REWARD_OPTIONS } from "@/constants/rewardOptions"

export default function RewardDropdown() {
  const dispatch = useDispatch()
  const {
    selectedRewardId,
    rewardValue,
    isRewardDropdownOpen,
    isRewardSaved,
    isEventSaved,
  } = useSelector((state) => state.gamification)

  const inputRef = useRef(null)
  const selectedOption = REWARD_OPTIONS.find((o) => o.id === selectedRewardId)

  useEffect(() => {
    if (selectedOption?.requiresInput && isRewardDropdownOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedRewardId, isRewardDropdownOpen, selectedOption?.requiresInput])

  const displayLabel =
    isRewardSaved && selectedOption
      ? selectedOption.getDisplayLabel(rewardValue)
      : selectedOption
        ? selectedOption.label
        : null

  /* Don't render the reward selector until the event is saved */
  if (!isEventSaved) return null

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-text-primary mb-1.5">
        Reward with <span className="text-brand-500">*</span>
      </label>

      {/* Trigger */}
      <button
        id="reward-dropdown-trigger"
        type="button"
        onClick={() => dispatch(toggleRewardDropdown())}
        className={`
          w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm
          transition-colors duration-150 cursor-pointer
          ${
            isRewardDropdownOpen
              ? "border-brand-500 ring-1 ring-brand-500"
              : isRewardSaved
                ? "border-border bg-white"
                : "border-border hover:border-gray-300"
          }
        `}
      >
        <span className={displayLabel ? "text-text-primary" : "text-text-muted"}>
          {displayLabel || "Select a reward"}
        </span>
        {isRewardDropdownOpen ? (
          <ChevronUp size={16} className="text-text-muted" />
        ) : (
          <ChevronDown size={16} className="text-text-muted" />
        )}
      </button>

      {/* Dropdown panel */}
      {isRewardDropdownOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-lg z-20 overflow-hidden">
          {REWARD_OPTIONS.map((option) => {
            const isSelected = selectedRewardId === option.id
            return (
              <div key={option.id}>
                <button
                  type="button"
                  onClick={() => dispatch(selectReward(option.id))}
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

                {isSelected && option.requiresInput && (
                  <div className="px-3 pb-2.5">
                    <div className="flex items-center border border-brand-300 rounded-lg overflow-hidden bg-brand-50/30 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                      <span className="pl-3 pr-1 text-sm text-text-secondary">
                        {option.inputPrefix}
                      </span>
                      <input
                        ref={inputRef}
                        type="number"
                        value={rewardValue}
                        onChange={(e) =>
                          dispatch(setRewardValue(e.target.value))
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
