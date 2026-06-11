import { useRef, useEffect, useState, useCallback } from "react"
import { Phone, Video, Send, Smile } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EmojiPicker, { type EmojiClickData, Theme } from "emoji-picker-react"
import taskImage from "@/assets/Image.svg"
import type { Contact, ChatMessage } from "./messageData"

// Feature overlays
import { VoiceCallOverlay } from "./Usevoicecall"
import { VideoCallOverlay } from "./Usevideocall"
import { useVideoCall } from "./hooks/useVideoCall"
import { HiddenFileInput, ImagePreviewModal, AttachButton } from "./Useimagesend"
import { useVoiceCall } from "./hooks/useVoiceCall"
import { useImageSend } from "./hooks/useImageSend"

// Image bubble: data-URL or fallback to task asset 
function ImageBubble({ src }: { src: string }) {
    const imgSrc = src === "dashboard-preview" ? taskImage : src
    return (
        <div className="rounded-xl overflow-hidden w-full max-w-[260px]">
            <img src={imgSrc} alt="Shared image" className="w-full h-auto object-cover rounded-xl" />
        </div>
    )
}

// Chat bubble 
function Bubble({ msg, contact }: { msg: ChatMessage; contact: Contact }) {
    if (msg.isMine) {
        return (
            <div className="flex flex-col items-end gap-0.5">
                {msg.dateLabel && (
                    <div className="self-center mb-2">
                        <span className="text-[14px] font-semibold text-white bg-[#141522] px-4 py-2 rounded-lg shadow-sm">
                            {msg.dateLabel}
                        </span>
                    </div>
                )}

                {msg.image ? (
                    <div className="max-w-[280px] flex flex-col items-end gap-1.5">
                        <ImageBubble src={msg.image} />
                        {msg.imageCaption && (
                            <div className="bg-[#546FFF] text-white rounded-2xl rounded-tr-sm px-4 py-2.5">
                                <p className="text-sm leading-relaxed">{msg.imageCaption}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-[#546FFF] text-[14px] text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[280px]">
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                )}

                {msg.time && <span className="text-[10px] text-[#8E92BC]">{msg.time}</span>}
            </div>
        )
    }

    return (
        <div className="flex items-end gap-2">
            <Avatar className="w-8 h-8 flex-shrink-0 border border-[#EBEBF0]">
                <AvatarImage src={contact.avatarImg} alt={contact.name} />
                <AvatarFallback className="text-[10px] font-semibold bg-[#EEF1FE] text-[#5C5CE5]">
                    {contact.avatar}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5 max-w-[280px]">
                <div className="bg-white border border-[#E0E0EA] rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                    <p className="text-[14px] text-[#141522] leading-relaxed">{msg.text}</p>
                </div>
                {msg.time && <span className="text-[10px] text-[#9898A6] ml-1">{msg.time}</span>}
            </div>
        </div>
    )
}

// Main export 
interface MessageChatProps {
    contact: Contact
    messages: ChatMessage[]
    inputValue: string
    onInputChange: (v: string) => void
    onSend: () => void
    onSendImage: (msg: ChatMessage) => void
}

export default function MessageChat({
    contact,
    messages,
    inputValue,
    onInputChange,
    onSend,
    onSendImage,
}: MessageChatProps) {
    const bottomRef = useRef<HTMLDivElement>(null)
    const pickerRef = useRef<HTMLDivElement>(null)

    // ── Feature hooks ──
    const voice = useVoiceCall()
    const video = useVideoCall()
    const img = useImageSend(onSendImage)

    // ── Emoji picker state ──
    const [emojiOpen, setEmojiOpen] = useState(false)

    const handleEmojiClick = useCallback((data: EmojiClickData) => {
        onInputChange(inputValue + data.emoji)
    }, [inputValue, onInputChange])

    // Close picker when clicking outside
    useEffect(() => {
        if (!emojiOpen) return
        const handler = (e: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setEmojiOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [emojiOpen])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) onSend()
    }

    return (
        <div className="flex flex-col h-full overflow-hidden relative">

            {/* ── Voice call overlay ── */}
            <VoiceCallOverlay
                contact={contact}
                status={voice.status}
                duration={voice.duration}
                onEnd={voice.endCall}
            />

            {/* ── Video call overlay ── */}
            <VideoCallOverlay
                contact={contact}
                status={video.status}
                duration={video.duration}
                onEnd={video.endCall}
            />

            {/* ── Image preview modal ── */}
            {img.preview && (
                <ImagePreviewModal
                    preview={img.preview}
                    caption={img.caption}
                    onCaptionChange={img.setCaption}
                    onSend={img.sendImage}
                    onCancel={img.cancel}
                />
            )}

            {/* ── Hidden file input ── */}
            <HiddenFileInput fileInputRef={img.fileInputRef as React.RefObject<HTMLInputElement>} onChange={img.onFileChange} />

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBEBF0] bg-white flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar className="w-11 h-11 border border-[#EBEBF0]">
                            <AvatarImage src={contact.avatarImg} alt={contact.name} />
                            <AvatarFallback className="text-xs font-semibold bg-[#EEF1FE] text-[#5C5CE5]">
                                {contact.avatar}
                            </AvatarFallback>
                        </Avatar>
                        {contact.isOnline && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[#141522]">{contact.name}</p>
                        <p className="text-xs text-green-500 font-medium">Online</p>
                    </div>
                </div>

                {/* Call buttons — trigger their respective hooks */}
                <div className="flex items-center gap-3 text-[#9898A6]">
                    <button
                        onClick={video.startCall}
                        disabled={voice.status !== "idle" || video.status !== "idle"}
                        className="hover:text-[#5C5CE5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors p-1"
                        aria-label="Video call"
                    >
                        <Video size={18} />
                    </button>
                    <button
                        onClick={voice.startCall}
                        disabled={voice.status !== "idle" || video.status !== "idle"}
                        className="hover:text-[#5C5CE5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors p-1"
                        aria-label="Voice call"
                    >
                        <Phone size={18} />
                    </button>
                </div>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto min-h-0 px-5 py-4 flex flex-col gap-4 bg-[#F0F0F0]">
                {messages.map((msg) => (
                    <Bubble key={msg.id} msg={msg} contact={contact} />
                ))}
                <div ref={bottomRef} />
            </div>

            {/* ── Input bar ── */}
            <div className="px-5 py-4 border-t border-[#EBEBF0] bg-white flex-shrink-0">
                {/* Emoji picker popover — sits above input bar */}
                {emojiOpen && (
                    <div ref={pickerRef} className="mb-2">
                        <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            theme={Theme.LIGHT}
                            width="100%"
                            height={340}
                            searchDisabled={false}
                            skinTonesDisabled
                            previewConfig={{ showPreview: false }}
                        />
                    </div>
                )}

                <div className="flex items-center gap-3 bg-[#F5F5FA] rounded-2xl px-4 py-2.5">
                    <button
                        onClick={() => setEmojiOpen((o) => !o)}
                        className={`transition-colors flex-shrink-0 ${emojiOpen ? "text-[#5C5CE5]" : "text-[#8E92BC] hover:text-[#5C5CE5]"}`}
                        aria-label="Emoji picker"
                    >
                        <Smile size={18} />
                    </button>

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Send your message..."
                        className="flex-1 bg-transparent text-sm text-[#8E92BC] placeholder:text-[#8E92BC] outline-none"
                    />

                    <AttachButton onClick={img.openPicker} />

                    <button
                        onClick={onSend}
                        disabled={false}
                        className="w-8 h-8 bg-[#546FFF] rounded-xl flex items-center justify-center text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                        aria-label="Send message"
                    >
                        <Send size={12} />
                    </button>
                </div>
            </div>
        </div>
    )
}