import { useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { X } from "lucide-react"
import Button from "@/components/ui/Button"
import Tooltip from "@/components/ui/Tooltip"
import EventDropdown from "./EventDropdown"
import RewardDropdown from "./RewardDropdown"
import TimeBoundToggle from "./TimeBoundToggle"
import DatePicker from "./DatePicker"
import SuccessToast from "./SuccessToast"
import TierSelectView from "./TierSelectView"
import {
  closeModal,
  createRewardSuccess,
} from "@/store/gamificationSlice"

export default function RewardModal() {
  const dispatch = useDispatch()
  const {
    isModalOpen,
    modalView,
    isEventSaved,
    isRewardSaved,
    isTimeBound,
    endDate,
    showSuccess,
  } = useSelector((state) => state.gamification)

  /* Check if the full form is valid for creation */
  const canCreate =
    isEventSaved && isRewardSaved && (!isTimeBound || endDate)

  /* Tooltip for the Create Reward button */
  const tooltipMessage = useMemo(() => {
    if (!isEventSaved)
      return "Choose a reward trigger and a reward to continue"
    if (!isRewardSaved)
      return "Choose a reward to continue"
    if (isTimeBound && !endDate)
      return "Choose reward end date to continue"
    return null
  }, [isEventSaved, isRewardSaved, isTimeBound, endDate])

  if (!isModalOpen) return null
  if (showSuccess) return <SuccessToast />

  /* ── Tier select view ── */
  if (modalView === "tier_select") {
    return (
      <div
        className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-black/40"
        onClick={(e) => {
          if (e.target === e.currentTarget) dispatch(closeModal())
        }}
      >
        <div
          className="
            bg-white shadow-2xl w-full animate-fade-in
            rounded-t-2xl md:rounded-xl
            md:max-w-md md:mx-4
            flex flex-col min-h-[420px]
          "
          onClick={(e) => e.stopPropagation()}
        >
          <TierSelectView />
        </div>
      </div>
    )
  }

  /* ── Main view ── */
  return (
    <div
      className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-black/40"
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(closeModal())
      }}
    >
      <div
        className="
          bg-white shadow-2xl w-full animate-fade-in
          rounded-t-2xl md:rounded-xl
          md:max-w-md md:mx-4
          flex flex-col min-h-[420px]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle — mobile only */}
        <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 shrink-0">
          <h2 className="text-base font-semibold text-text-primary m-0">
            Create your reward system
          </h2>
          <button
            id="modal-close-btn"
            onClick={() => dispatch(closeModal())}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={18} className="text-text-secondary" />
          </button>
        </div>

        {/* Body — overflow visible so dropdowns render outside */}
        <div className="px-6 space-y-5 flex-1">
          <EventDropdown />
          <RewardDropdown />

          {isRewardSaved && (
            <>
              <TimeBoundToggle />
              <DatePicker />
            </>
          )}
        </div>

        {/* Footer — always Cancel + Create Reward */}
        <div className="relative flex items-center justify-end gap-3 px-6 pt-5 pb-5 shrink-0">
          <Button
            id="modal-cancel-btn"
            variant="secondary"
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </Button>
          <Button
            id="modal-create-btn"
            variant="primary"
            disabled={!canCreate}
            onClick={() => dispatch(createRewardSuccess())}
          >
            Create Reward
          </Button>

          <Tooltip message={tooltipMessage} visible={!canCreate} />
        </div>
      </div>
    </div>
  )
}
