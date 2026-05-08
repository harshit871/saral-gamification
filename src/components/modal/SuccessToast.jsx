import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { dismissSuccess } from "@/store/gamificationSlice"
import SuccessCheckIcon from "@/assets/icons/Success"

export default function SuccessToast() {
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(dismissSuccess())
    }, 2500)
    return () => clearTimeout(timer)
  }, [dispatch])

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 pointer-events-none">
      <div className="bg-text-primary rounded-2xl px-2.5 py-2 flex items-center gap-1 animate-fade-in pointer-events-auto">
        <SuccessCheckIcon className="text-success shrink-0" width="26" height="26" />

        <span className="text-white text-base">
          Reward Created!
        </span>
      </div>
    </div>
  )
}
