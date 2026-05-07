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
import { EVENT_OPTIONS } from "@/constants/rewardOptions"
import { REWARD_OPTIONS } from "@/constants/rewardOptions"
import {
  closeModal,
  saveEvent,
  saveReward,
  createRewardSuccess,
} from "@/store/gamificationSlice"

export default function RewardModal() {
  const dispatch = useDispatch()
  const {
    isModalOpen,
    selectedEventId,
    eventValue,
    isEventDropdownOpen,
    isEventSaved,
    selectedRewardId,
    rewardValue,
    isRewardDropdownOpen,
    isRewardSaved,
    isTimeBound,
    endDate,
    showSuccess,
  } = useSelector((state) => state.gamification)

  const selectedEvent = EVENT_OPTIONS.find((o) => o.id === selectedEventId)
  const selectedReward = REWARD_OPTIONS.find((o) => o.id === selectedRewardId)

  /* Determine which phase we're in for button/tooltip logic */
  const phase = useMemo(() => {
    if (!isEventSaved) return "event"
    if (!isRewardSaved) return "reward"
    return "final"
  }, [isEventSaved, isRewardSaved])

  /* Check if current event selection can be saved */
  const canSaveEvent =
    selectedEventId &&
    (!selectedEvent?.requiresInput || (selectedEvent?.requiresInput && eventValue))

  /* Check if current reward selection can be saved */
  const canSaveReward =
    selectedRewardId &&
    (!selectedReward?.requiresInput ||
      (selectedReward?.requiresInput && rewardValue))

  /* Check if the full form is valid for creation */
  const canCreate =
    isEventSaved && isRewardSaved && (!isTimeBound || endDate)

  /* Tooltip message */
  const tooltipMessage = useMemo(() => {
    if (phase === "event") {
      if (!selectedEventId) return "Choose a reward trigger and a reward to continue"
      if (selectedEvent?.requiresInput && !eventValue)
        return "Enter the sales target amount to continue"
      return null
    }
    if (phase === "reward") {
      if (!selectedRewardId) return "Choose a reward to continue"
      if (selectedReward?.requiresInput && !rewardValue)
        return "Enter the reward amount to continue"
      return null
    }
    if (phase === "final" && isTimeBound && !endDate) {
      return "Choose reward end date to continue"
    }
    return null
  }, [
    phase,
    selectedEventId,
    selectedEvent,
    eventValue,
    selectedRewardId,
    selectedReward,
    rewardValue,
    isTimeBound,
    endDate,
  ])

  if (!isModalOpen) return null
  if (showSuccess) return <SuccessToast />

  /* Determine primary action */
  const handlePrimaryAction = () => {
    if (phase === "event" && canSaveEvent) {
      dispatch(saveEvent())
    } else if (phase === "reward" && canSaveReward) {
      dispatch(saveReward())
    } else if (phase === "final" && canCreate) {
      dispatch(createRewardSuccess())
    }
  }

  const primaryLabel =
    phase === "event"
      ? "Save"
      : phase === "reward"
        ? "Save"
        : "Create Reward"

  const isPrimaryDisabled =
    phase === "event"
      ? !canSaveEvent
      : phase === "reward"
        ? !canSaveReward
        : !canCreate

  return (
    /*
     * Overlay:
     *   mobile  → items-end so the sheet sticks to the bottom
     *   md+     → items-center for a centered dialog
     */
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
          max-h-[90dvh] md:max-w-md md:mx-4
          flex flex-col overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle — mobile only */}
        <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-4 shrink-0">
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

        {/* Scrollable body */}
        <div className="px-6 space-y-5 overflow-y-auto flex-1">
          <EventDropdown />

          {/* Reward dropdown — only visible when event is saved */}
          <RewardDropdown />

          {/* Time-bound section — only when event and reward are saved */}
          {isRewardSaved && (
            <>
              <TimeBoundToggle />
              <DatePicker />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="relative flex items-center justify-end gap-3 px-6 pt-4 pb-6 md:pb-5 shrink-0 border-t border-border mt-4">
          <Button
            id="modal-cancel-btn"
            variant="secondary"
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </Button>
          <Button
            id="modal-primary-btn"
            variant="primary"
            disabled={isPrimaryDisabled}
            onClick={handlePrimaryAction}
          >
            {primaryLabel}
          </Button>

          <Tooltip message={tooltipMessage} visible={isPrimaryDisabled} />
        </div>
      </div>
    </div>
  )
}
