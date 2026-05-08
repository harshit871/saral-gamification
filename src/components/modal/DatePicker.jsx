import { useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import CalendarIcon from "@/assets/icons/Calendar";
import Button from "@/components/ui/Button"
import { toggleDatePicker, setEndDate } from "@/store/gamificationSlice"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
  addDays,
} from "date-fns"

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

export default function DatePicker() {
  const dispatch = useDispatch()
  const { isTimeBound, endDate, isDatePickerOpen } = useSelector(
    (state) => state.gamification
  )
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const minDate = useMemo(() => addDays(startOfDay(new Date()), 1), [])

  const selectedDate = endDate ? new Date(endDate) : null

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  }, [currentMonth])

  const handleSelectDate = (day) => {
    if (isBefore(day, minDate)) return
    dispatch(setEndDate(day.toISOString()))
  }

  if (!isTimeBound) return null

  return (
    <div className="relative mt-3">
      <button
        id="date-picker-trigger"
        type="button"
        onClick={() => dispatch(toggleDatePicker())}
        className={`
          w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm
          transition-colors duration-150 cursor-pointer
          ${isDatePickerOpen
            ? "border-brand-500 ring-1 ring-brand-500"
            : selectedDate
              ? "border-border"
              : "border-border hover:border-gray-300"
          }
        `}
      >
        <CalendarIcon className="text-text-muted shrink-0" />
        <span className={`text-base leading-[1.4] ${selectedDate ? "text-text-primary" : "text-text-muted"}`}>
          {selectedDate
            ? format(selectedDate, "d MMM, yyyy")
            : "Select End Date"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="absolute left-0 bottom-full mb-1 bg-white border border-border rounded-xl shadow-xl z-30 p-4 w-72">

          <div className="flex items-center justify-between mb-3">
            <Button variant="secondary" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} size="icon" className="px-2!">
              <ArrowLeft size={16} className="text-text-secondary" />
            </Button>
            <span className="text-sm font-medium text-text-primary">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <Button
              variant="secondary"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              size="icon"
              className="px-2!"
            >
              <ArrowRight size={16} className="text-text-secondary" />
            </Button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {DAY_LABELS.map((label) => (
              <div
                key={label}
                className="text-center text-sm leading-[1.4] font-medium text-text-muted py-1"
              >
                {label}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendarDays.map((day) => {
              const isCurrentMonth = isSameMonth(day, currentMonth)
              const isDisabled = isBefore(day, minDate)
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              const isToday = isSameDay(day, new Date())

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleSelectDate(day)}
                  disabled={isDisabled}
                  className={`
                    h-8 w-8 mx-auto rounded-md text-sm leading-[1.4] flex items-center justify-center
                    transition-colors duration-100
                    ${!isCurrentMonth ? "text-gray-300" : ""}
                    ${isDisabled ? "text-gray-300 cursor-not-allowed" : "cursor-pointer hover:bg-brand-50"}
                    ${isSelected ? "bg-brand-500 text-white hover:bg-brand-600" : ""}
                    ${isToday && !isSelected ? "ring-1 ring-brand-300" : ""}
                    ${isCurrentMonth && !isDisabled && !isSelected ? "text-text-primary" : ""}
                  `}
                >
                  {format(day, "d")}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
