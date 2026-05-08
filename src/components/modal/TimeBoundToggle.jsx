import { useSelector, useDispatch } from "react-redux"
import Toggle from "@/components/ui/Toggle"
import { toggleTimeBound } from "@/store/gamificationSlice"

export default function TimeBoundToggle() {
  const dispatch = useDispatch()
  const { isTimeBound } = useSelector((state) => state.gamification)

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-text-primary">
          Make the reward time bound
        </p>
        <p className="text-xs text-text-secondary mt-0.5">
          Choose an end date to stop this reward automatically.
        </p>
      </div>
      <Toggle
        id="time-bound-toggle"
        checked={isTimeBound}
        onChange={() => dispatch(toggleTimeBound())}
      />
    </div>
  )
}
