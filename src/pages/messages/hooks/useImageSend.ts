import { useState, useRef, useCallback } from "react"
import type { ChatMessage } from "../messageData"

export function useImageSend(onSendImage: (msg: ChatMessage) => void) {
    const [preview, setPreview] = useState<string | null>(null)
    const [caption, setCaption] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const openPicker = useCallback(() => {
        fileInputRef.current?.click()
    }, [])

    const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => {
            setPreview(ev.target?.result as string)
        }
        reader.readAsDataURL(file)
        // reset input so same file can be re-selected
        e.target.value = ""
    }, [])

    const sendImage = useCallback(() => {
        if (!preview) return
        onSendImage({
            id: Date.now().toString(),
            image: preview,
            imageCaption: caption.trim() || undefined,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isMine: true,
        })
        setPreview(null)
        setCaption("")
    }, [preview, caption, onSendImage])

    const cancel = useCallback(() => {
        setPreview(null)
        setCaption("")
    }, [])

    return { preview, caption, setCaption, openPicker, onFileChange, sendImage, cancel, fileInputRef }
}
