import { useState, useEffect, useRef, useCallback } from "react"
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Contact } from "./messageData"

// ─── Hook ────────────────────────────────────────────────────────────────────
export type CallStatus = "idle" | "ringing" | "connected" | "ended"

export function useVoiceCall() {
    const [status, setStatus] = useState<CallStatus>("idle")
    const [duration, setDuration] = useState(0)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const startCall = useCallback(() => {
        setStatus("ringing")
        setDuration(0)
        // simulate answer after 2s
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

// ─── Overlay UI ──────────────────────────────────────────────────────────────
interface VoiceCallOverlayProps {
    contact: Contact
    status: CallStatus
    duration: string
    onEnd: () => void
}

export function VoiceCallOverlay({ contact, status, duration, onEnd }: VoiceCallOverlayProps) {
    const [muted, setMuted] = useState(false)
    const [speakerOff, setSpeakerOff] = useState(false)

    if (status === "idle") return null

    const statusLabel =
        status === "ringing" ? "Calling..." :
            status === "connected" ? duration :
                "Call Ended"

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-3xl">
            <div className="bg-white rounded-3xl shadow-2xl w-72 flex flex-col items-center py-10 px-8 gap-6">
                {/* Avatar */}
                <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-[#EEF1FE]">
                        <AvatarImage src={contact.avatarImg} alt={contact.name} />
                        <AvatarFallback className="text-xl font-bold bg-[#EEF1FE] text-[#5C5CE5]">
                            {contact.avatar}
                        </AvatarFallback>
                    </Avatar>
                    {status === "ringing" && (
                        <span className="absolute inset-0 rounded-full border-4 border-[#5C5CE5] animate-ping opacity-40" />
                    )}
                </div>

                {/* Info */}
                <div className="text-center">
                    <p className="text-lg font-bold text-[#1A1A2E]">{contact.name}</p>
                    <p className={`text-sm mt-1 font-medium ${status === "connected" ? "text-green-500" : "text-[#9898A6]"}`}>
                        {statusLabel}
                    </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => setMuted((m) => !m)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${muted ? "bg-[#5C5CE5] text-white" : "bg-[#F0F0F0] text-[#3C3C46]"
                            }`}
                        aria-label={muted ? "Unmute" : "Mute"}
                    >
                        {muted ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>

                    <button
                        onClick={onEnd}
                        className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-colors"
                        aria-label="End call"
                    >
                        <PhoneOff size={24} />
                    </button>

                    <button
                        onClick={() => setSpeakerOff((s) => !s)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${speakerOff ? "bg-[#5C5CE5] text-white" : "bg-[#F0F0F0] text-[#3C3C46]"
                            }`}
                        aria-label={speakerOff ? "Speaker on" : "Speaker off"}
                    >
                        {speakerOff ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                </div>

                {/* Incoming indicator */}
                {status === "ringing" && (
                    <div className="flex items-center gap-2 text-xs text-[#9898A6]">
                        <Phone size={12} className="animate-bounce" />
                        <span>Connecting…</span>
                    </div>
                )}
            </div>
        </div>
    )
}