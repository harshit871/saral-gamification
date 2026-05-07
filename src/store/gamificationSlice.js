import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isModalOpen: false,

  /* Modal view: "main" | "tier_select" */
  modalView: "main",

  /* Event selection */
  selectedEventId: null,
  eventValue: "",
  eventDuration: null,
  isEventDropdownOpen: false,
  isEventSaved: false,

  /* Snapshot — stores saved values so Cancel can revert */
  eventSnapshot: null,

  /* Reward selection */
  selectedRewardId: null,
  rewardValue: "",
  selectedTierId: null,
  isRewardDropdownOpen: false,
  isRewardSaved: false,

  rewardSnapshot: null,

  /* Time-bound */
  isTimeBound: false,
  endDate: null,
  isDatePickerOpen: false,

  /* Duration picker for posts_period event */
  isDurationDropdownOpen: false,

  /* UI feedback */
  showSuccess: false,
}

const gamificationSlice = createSlice({
  name: "gamification",
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true
    },
    closeModal() {
      return { ...initialState }
    },

    /* ── Event ── */
    toggleEventDropdown(state) {
      state.isEventDropdownOpen = !state.isEventDropdownOpen
      if (state.isEventDropdownOpen) {
        state.isRewardDropdownOpen = false
        state.isDatePickerOpen = false
        state.isDurationDropdownOpen = false
      }
    },
    selectEvent(state, action) {
      state.selectedEventId = action.payload
      state.eventValue = ""
      state.eventDuration = null
      /* Don't clear isEventSaved here — that happens only if
         we're switching to a different option while editing */
      state.isEventSaved = false
    },
    setEventValue(state, action) {
      /* Only allow non-negative numbers (strip leading minus) */
      const raw = action.payload
      if (raw === "" || (/^\d*\.?\d*$/.test(raw) && Number(raw) >= 0)) {
        state.eventValue = raw
      }
    },
    setEventDuration(state, action) {
      state.eventDuration = action.payload
      state.isDurationDropdownOpen = false
    },
    toggleDurationDropdown(state) {
      state.isDurationDropdownOpen = !state.isDurationDropdownOpen
    },
    saveEvent(state) {
      state.isEventSaved = true
      state.isEventDropdownOpen = false
      state.isDurationDropdownOpen = false
      state.eventSnapshot = null
      /* auto-open reward dropdown */
      state.isRewardDropdownOpen = true
    },

    /* Edit — snapshot current values then re-open dropdown */
    editEvent(state) {
      state.eventSnapshot = {
        selectedEventId: state.selectedEventId,
        eventValue: state.eventValue,
        eventDuration: state.eventDuration,
      }
      state.isEventDropdownOpen = true
      state.isRewardDropdownOpen = false
      state.isDatePickerOpen = false
    },

    /* Cancel — revert to snapshot if one exists */
    cancelEvent(state) {
      if (state.eventSnapshot) {
        state.selectedEventId = state.eventSnapshot.selectedEventId
        state.eventValue = state.eventSnapshot.eventValue
        state.eventDuration = state.eventSnapshot.eventDuration
        state.isEventSaved = true
        state.eventSnapshot = null
      }
      state.isEventDropdownOpen = false
      state.isDurationDropdownOpen = false
    },

    /* ── Reward ── */
    toggleRewardDropdown(state) {
      state.isRewardDropdownOpen = !state.isRewardDropdownOpen
      if (state.isRewardDropdownOpen) {
        state.isEventDropdownOpen = false
        state.isDatePickerOpen = false
        state.isDurationDropdownOpen = false
      }
    },
    selectReward(state, action) {
      state.selectedRewardId = action.payload
      state.rewardValue = ""
      state.selectedTierId = null
      state.isRewardSaved = false

      /* If "upgrade_commission", switch to tier select view */
      if (action.payload === "upgrade_commission") {
        state.modalView = "tier_select"
        state.isRewardDropdownOpen = false
      }
    },
    setRewardValue(state, action) {
      const raw = action.payload
      if (raw === "" || (/^\d*\.?\d*$/.test(raw) && Number(raw) >= 0)) {
        state.rewardValue = raw
      }
    },
    selectTier(state, action) {
      state.selectedTierId = action.payload
    },
    saveTier(state) {
      state.isRewardSaved = true
      state.modalView = "main"
      state.isRewardDropdownOpen = false
      state.rewardSnapshot = null
    },
    goBackFromTierSelect(state) {
      state.modalView = "main"
      state.selectedRewardId = null
      state.selectedTierId = null
      state.isRewardDropdownOpen = true
    },
    saveReward(state) {
      state.isRewardSaved = true
      state.isRewardDropdownOpen = false
      state.rewardSnapshot = null
    },
    editReward(state) {
      state.rewardSnapshot = {
        selectedRewardId: state.selectedRewardId,
        rewardValue: state.rewardValue,
        selectedTierId: state.selectedTierId,
      }
      state.isRewardDropdownOpen = true
      state.isEventDropdownOpen = false
      state.isDatePickerOpen = false
    },
    cancelReward(state) {
      if (state.rewardSnapshot) {
        state.selectedRewardId = state.rewardSnapshot.selectedRewardId
        state.rewardValue = state.rewardSnapshot.rewardValue
        state.selectedTierId = state.rewardSnapshot.selectedTierId
        state.isRewardSaved = true
        state.rewardSnapshot = null
      }
      state.isRewardDropdownOpen = false
    },

    /* ── Time-bound ── */
    toggleTimeBound(state) {
      state.isTimeBound = !state.isTimeBound
      if (!state.isTimeBound) {
        state.endDate = null
        state.isDatePickerOpen = false
      }
    },
    toggleDatePicker(state) {
      state.isDatePickerOpen = !state.isDatePickerOpen
      if (state.isDatePickerOpen) {
        state.isEventDropdownOpen = false
        state.isRewardDropdownOpen = false
        state.isDurationDropdownOpen = false
      }
    },
    setEndDate(state, action) {
      state.endDate = action.payload
      state.isDatePickerOpen = false
    },

    /* ── Creation ── */
    createRewardSuccess(state) {
      state.showSuccess = true
    },
    dismissSuccess() {
      return { ...initialState }
    },
  },
})

export const {
  openModal,
  closeModal,
  toggleEventDropdown,
  selectEvent,
  setEventValue,
  setEventDuration,
  toggleDurationDropdown,
  saveEvent,
  editEvent,
  cancelEvent,
  toggleRewardDropdown,
  selectReward,
  setRewardValue,
  selectTier,
  saveTier,
  goBackFromTierSelect,
  saveReward,
  editReward,
  cancelReward,
  toggleTimeBound,
  toggleDatePicker,
  setEndDate,
  createRewardSuccess,
  dismissSuccess,
} = gamificationSlice.actions

export default gamificationSlice.reducer
