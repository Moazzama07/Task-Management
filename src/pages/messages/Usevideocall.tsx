import { useState } from "react"
import {
    VideoOff, Video, Mic, MicOff, PhoneOff,
    Monitor, MonitorOff, Maximize2, Minimize2,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Contact } from "./messageData"
import type { VideoCallStatus } from "./hooks/useVideoCall"

function FakeVideoFeed({ label, small = false }: { label: string; small?: boolean }) {
    return (
        <div
            className={`bg-gradient-to-br from-[#1A1A2E] via-[#2D2D5E] to-[#5C5CE5] flex items-end justify-start p-2
        ${small ? "rounded-xl w-28 h-20" : "w-full h-full rounded-2xl"}`}
        >
            <span className="text-white/60 text-[10px] font-medium">{label}</span>
        </div>
    )
}


interface VideoCallOverlayProps {
    contact: Contact
    status: VideoCallStatus
    duration: string
    onEnd: () => void
}

export function VideoCallOverlay({ contact, status, duration, onEnd }: VideoCallOverlayProps) {
    const [muted, setMuted] = useState(false)
    const [camOff, setCamOff] = useState(false)
    const [screenShare, setScreenShare] = useState(false)
    const [fullscreen, setFullscreen] = useState(false)

    if (status === "idle") return null

    const statusLabel =
        status === "ringing" ? "Calling..." :
            status === "connected" ? duration :
                "Call Ended"

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-3xl">
            <div
                className={`bg-[#1A1A2E] rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300
          ${fullscreen ? "w-full h-full rounded-none" : "w-[520px] h-[380px]"}`}
            >
                {/* ── Video area ── */}
                <div className="relative flex-1 bg-[#0D0D1A]">
                    {status === "connected" && !camOff ? (
                        <FakeVideoFeed label={contact.name} />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                            <Avatar className="w-20 h-20 border-4 border-white/10">
                                <AvatarImage src={contact.avatarImg} alt={contact.name} />
                                <AvatarFallback className="text-xl font-bold bg-[#2D2D5E] text-[#5C5CE5]">
                                    {contact.avatar}
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-white font-semibold text-base">{contact.name}</p>
                            <p className={`text-sm font-medium ${status === "connected" ? "text-green-400" : "text-white/50"}`}>
                                {statusLabel}
                            </p>
                            {status === "ringing" && (
                                <span className="absolute inset-0 rounded-full border-4 border-[#5C5CE5] animate-ping opacity-20 pointer-events-none" />
                            )}
                        </div>
                    )}

                    {/* Self PiP */}
                    {status === "connected" && (
                        <div className="absolute bottom-3 right-3">
                            <FakeVideoFeed label="You" small />
                        </div>
                    )}

                    {/* Timer badge */}
                    {status === "connected" && (
                        <div className="absolute top-3 left-3 bg-black/40 text-white/80 text-xs px-2.5 py-1 rounded-full font-mono">
                            {duration}
                        </div>
                    )}

                    {/* Fullscreen toggle */}
                    <button
                        onClick={() => setFullscreen((f) => !f)}
                        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 text-white/70 hover:text-white flex items-center justify-center transition-colors"
                        aria-label="Toggle fullscreen"
                    >
                        {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                </div>

                {/* ── Controls bar ── */}
                <div className="flex items-center justify-center gap-4 py-4 px-6 bg-[#1A1A2E]">
                    <button
                        onClick={() => setMuted((m) => !m)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${muted ? "bg-white/20 text-red-400" : "bg-white/10 text-white/70 hover:bg-white/20"
                            }`}
                        aria-label={muted ? "Unmute" : "Mute"}
                    >
                        {muted ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>

                    <button
                        onClick={() => setCamOff((c) => !c)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${camOff ? "bg-white/20 text-red-400" : "bg-white/10 text-white/70 hover:bg-white/20"
                            }`}
                        aria-label={camOff ? "Camera on" : "Camera off"}
                    >
                        {camOff ? <VideoOff size={18} /> : <Video size={18} />}
                    </button>

                    {/* End call */}
                    <button
                        onClick={onEnd}
                        className="w-14 h-11 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-colors"
                        aria-label="End call"
                    >
                        <PhoneOff size={20} />
                    </button>

                    <button
                        onClick={() => setScreenShare((s) => !s)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${screenShare ? "bg-[#5C5CE5] text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
                            }`}
                        aria-label={screenShare ? "Stop sharing" : "Share screen"}
                    >
                        {screenShare ? <MonitorOff size={18} /> : <Monitor size={18} />}
                    </button>
                </div>
            </div>
        </div>
    )
}