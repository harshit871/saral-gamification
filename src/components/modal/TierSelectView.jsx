import { useSelector, useDispatch } from "react-redux"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { useState } from "react"
import Button from "@/components/ui/Button"
import {
  selectTier,
  saveTier,
  goBackFromTierSelect,
  closeModal,
} from "@/store/gamificationSlice"
import { COMMISSION_TIERS } from "@/constants/rewardOptions"

export default function TierSelectView() {
  const dispatch = useDispatch()
  const { selectedTierId } = useSelector((state) => state.gamification)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const selectedTier = COMMISSION_TIERS.find((t) => t.id === selectedTierId)

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4 shrink-0">
        <h2 className="text-base font-semibold text-text-primary m-0">
          Select a commission tier
        </h2>
        <button
          onClick={() => dispatch(closeModal())}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X size={18} className="text-text-secondary" />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 flex-1">
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          Upgrade to <span className="text-brand-500">*</span>
        </label>

        <div className="relative">
          {/* Tier dropdown trigger */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`
              w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm
              transition-colors duration-150 cursor-pointer
              ${
                isDropdownOpen
                  ? "border-brand-500 ring-1 ring-brand-500"
                  : "border-border hover:border-gray-300"
              }
            `}
          >
            <span
              className={
                selectedTier ? "text-text-primary" : "text-text-muted"
              }
            >
              {selectedTier?.label || "Select a tier"}
            </span>
            {isDropdownOpen ? (
              <ChevronUp size={16} className="text-text-muted" />
            ) : (
              <ChevronDown size={16} className="text-text-muted" />
            )}
          </button>

          {/* Tier options */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-lg z-20">
              {COMMISSION_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => {
                    dispatch(selectTier(tier.id))
                    setIsDropdownOpen(false)
                  }}
                  className={`
                    w-full text-left px-3 py-2.5 text-sm cursor-pointer transition-colors
                    ${
                      selectedTierId === tier.id
                        ? "text-brand-500 bg-brand-50/50"
                        : "text-text-primary hover:bg-gray-50"
                    }
                  `}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-3 px-6 pt-5 pb-5 shrink-0">
        <Button
          variant="secondary"
          onClick={() => dispatch(goBackFromTierSelect())}
        >
          Go Back
        </Button>
        <Button
          variant="primary"
          disabled={!selectedTierId}
          onClick={() => dispatch(saveTier())}
        >
          Save
        </Button>
      </div>
    </>
  )
}
