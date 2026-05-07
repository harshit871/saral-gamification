import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isModalOpen: false,

  /* Event selection */
  selectedEventId: null,
  eventValue: "",
  isEventDropdownOpen: false,
  isEventSaved: false,

  /* Reward selection */
  selectedRewardId: null,
  rewardValue: "",
  isRewardDropdownOpen: false,
  isRewardSaved: false,

  /* Time-bound */
  isTimeBound: false,
  endDate: null,
  isDatePickerOpen: false,

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

    /* Event */
    toggleEventDropdown(state) {
      state.isEventDropdownOpen = !state.isEventDropdownOpen
      if (state.isEventDropdownOpen) {
        state.isRewardDropdownOpen = false
        state.isDatePickerOpen = false
      }
    },
    selectEvent(state, action) {
      state.selectedEventId = action.payload
      state.eventValue = ""
      state.isEventSaved = false
    },
    setEventValue(state, action) {
      state.eventValue = action.payload
    },
    saveEvent(state) {
      state.isEventSaved = true
      state.isEventDropdownOpen = false
      /* auto-open reward dropdown after saving event */
      state.isRewardDropdownOpen = true
    },

    /* Reward */
    toggleRewardDropdown(state) {
      state.isRewardDropdownOpen = !state.isRewardDropdownOpen
      if (state.isRewardDropdownOpen) {
        state.isEventDropdownOpen = false
        state.isDatePickerOpen = false
      }
    },
    selectReward(state, action) {
      state.selectedRewardId = action.payload
      state.rewardValue = ""
      state.isRewardSaved = false
    },
    setRewardValue(state, action) {
      state.rewardValue = action.payload
    },
    saveReward(state) {
      state.isRewardSaved = true
      state.isRewardDropdownOpen = false
    },

    /* Time-bound */
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
      }
    },
    setEndDate(state, action) {
      state.endDate = action.payload
      state.isDatePickerOpen = false
    },

    /* Creation */
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
  saveEvent,
  toggleRewardDropdown,
  selectReward,
  setRewardValue,
  saveReward,
  toggleTimeBound,
  toggleDatePicker,
  setEndDate,
  createRewardSuccess,
  dismissSuccess,
} = gamificationSlice.actions

export default gamificationSlice.reducer
