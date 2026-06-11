import { X, Send, Image as ImageIcon, Upload } from "lucide-react"
import type { ChatMessage } from "./messageData"

//  Hidden file input 
interface HiddenFileInputProps {
    fileInputRef: React.RefObject<HTMLInputElement>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function HiddenFileInput({ fileInputRef, onChange }: HiddenFileInputProps) {
    return (
        <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChange}
        />
    )
}

// Image preview modal 
interface ImagePreviewModalProps {
    preview: string
    caption: string
    onCaptionChange: (v: string) => void
    onSend: () => void
    onCancel: () => void
}

export function ImagePreviewModal({
    preview,
    caption,
    onCaptionChange,
    onSend,
    onCancel,
}: ImagePreviewModalProps) {
    return (
        <div className="absolute inset-0 z-40 flex items-end justify-center bg-black/40 backdrop-blur-sm rounded-3xl pb-6">
            <div className="bg-white rounded-3xl shadow-2xl w-[340px] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBEBF0]">
                    <div className="flex items-center gap-2 text-[#3C3C46]">
                        <ImageIcon size={16} className="text-[#5C5CE5]" />
                        <span className="text-sm font-semibold">Send Image</span>
                    </div>
                    <button
                        onClick={onCancel}
                        className="w-7 h-7 rounded-full bg-[#F5F5FA] flex items-center justify-center text-[#9898A6] hover:text-[#3C3C46] transition-colors"
                        aria-label="Cancel"
                    >
                        <X size={14} />
                    </button>
                </div>

                {/* Preview */}
                <div className="px-5 pt-4 pb-3">
                    <div className="rounded-2xl overflow-hidden bg-[#F0F0F0] w-full max-h-52 flex items-center justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-w-full max-h-52 object-contain"
                        />
                    </div>
                </div>

                {/* Caption input */}
                <div className="px-5 pb-4">
                    <div className="flex items-center gap-2 bg-[#F5F5FA] rounded-xl px-3 py-2.5">
                        <input
                            type="text"
                            value={caption}
                            onChange={(e) => onCaptionChange(e.target.value)}
                            placeholder="Add a caption..."
                            className="flex-1 bg-transparent text-sm text-[#3C3C46] placeholder:text-[#B0B0C0] outline-none"
                            onKeyDown={(e) => { if (e.key === "Enter") onSend() }}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 px-5 pb-5">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2.5 rounded-xl border border-[#EBEBF0] text-sm text-[#9898A6] font-medium hover:bg-[#F5F5FA] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSend}
                        className="flex-1 py-2.5 rounded-xl bg-[#5C5CE5] hover:bg-[#4A4AD4] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                        <Send size={14} />
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

// Paperclip trigger button (export for use in chat input bar) 
interface AttachButtonProps {
    onClick: () => void
}

export function AttachButton({ onClick }: AttachButtonProps) {
    return (
        <button
            onClick={onClick}
            className="text-[#9898A6] hover:text-[#5C5CE5] transition-colors flex-shrink-0"
            aria-label="Attach image"
            title="Send image"
        >
            <Upload size={18} />
        </button>
    )
}