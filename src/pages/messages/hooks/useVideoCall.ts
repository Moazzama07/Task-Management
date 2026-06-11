import { useState, useEffect, useRef, useCallback } from "react"

export type VideoCallStatus = "idle" | "ringing" | "connected" | "ended"

export function useVideoCall() {
    const [status, setStatus] = useState<VideoCallStatus>("idle")
    const [duration, setDuration] = useState(0)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const startCall = useCallback(() => {
        setStatus("ringing")
        setDuration(0)
        setTimeout(() => setStatus("connected"), 2000)
    }, [])

    const endCall = useCallback(() => {
        setStatus("ended")
        if (timerRef.current) clearInterval(timerRef.current)
        setTimeout(() => setStatus("idle"), 1500)
    }, [])

    useEffect(() => {
        if (status === "connected") {
            timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000)
        } else {
            if (timerRef.current) clearInterval(timerRef.current)
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }, [status])

    const fmt = (s: number) =>
        `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

    return { status, duration: fmt(duration), startCall, endCall }
}
