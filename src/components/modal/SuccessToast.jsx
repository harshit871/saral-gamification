import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { CheckCircle } from "lucide-react"
import { dismissSuccess } from "@/store/gamificationSlice"

export default function SuccessToast() {
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(dismissSuccess())
    }, 2500)
    return () => clearTimeout(timer)
  }, [dispatch])

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 pointer-events-none">
      <div className="bg-white rounded-xl shadow-2xl border border-border px-6 py-4 flex items-center gap-3 animate-fade-in pointer-events-auto">
        <CheckCircle size={24} className="text-success shrink-0" />
        <span className="text-sm font-semibold text-text-primary">
          Reward Created!
        </span>
      </div>
    </div>
  )
}
