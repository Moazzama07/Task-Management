import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Message from "./Message"
import MessageChat from "./messageChart"
import { contacts as initialContacts, chatMessages as initialMessages } from "./messageData"
import type { ChatMessage } from "./messageData"

export default function Messages() {
    const [activeId, setActiveId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

    const activeContact = initialContacts.find((c) => c.id === activeId) ?? initialContacts[0]
    const chatOpen = activeId !== null  // mobile: is chat panel visible?

    const handleSelectContact = (id: string) => {
        setActiveId(id)
    }

    const handleBack = () => {
        setActiveId(null)
    }

    const handleSend = () => {
        const trimmed = inputValue.trim()
        if (!trimmed) return
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                text: trimmed,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                isMine: true,
            },
        ])
        setInputValue("")
    }

    const handleSendImage = (msg: ChatMessage) => {
        setMessages((prev) => [...prev, msg])
    }

    return (
        <div className="flex h-full rounded-xl border border-[#E8E8ED] bg-white shadow-sm overflow-hidden">

            <div
                className={`
          flex-shrink-0 flex flex-col overflow-hidden border-r border-[#EBEBF0]
          transition-all duration-300 ease-in-out
          /* mobile */
          w-full
          ${chatOpen ? "hidden" : "flex"}
          /* desktop ≥ md */
          md:flex md:w-72
        `}
            >
                {/* Mobile header */}
                <div className="px-4 pt-4 pb-1 flex-shrink-0 md:hidden">
                    <h2 className="text-base font-bold text-[#1A1A2E]">Messages</h2>
                </div>

                <Message
                    contacts={initialContacts}
                    activeId={activeId ?? ""}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSelectContact={handleSelectContact}
                />
            </div>

            <div
                className={`
          flex flex-col min-w-0 overflow-hidden
          transition-all duration-300 ease-in-out
          /* mobile */
          w-full
          ${chatOpen ? "flex" : "hidden"}
          /* desktop ≥ md */
          md:flex md:flex-1
        `}
            >
                {/* Mobile back button row */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#EBEBF0] bg-white flex-shrink-0 md:hidden">
                    <button
                        onClick={handleBack}
                        className="w-8 h-8 flex items-center justify-center text-[#3C3C46] hover:bg-[#EBEBF0] transition-colors"
                        aria-label="Back to contacts"
                    >
                        <ArrowLeft size={16} />
                    </button>

                </div>

                <MessageChat
                    contact={activeContact}
                    messages={messages}
                    inputValue={inputValue}
                    onInputChange={setInputValue}
                    onSend={handleSend}
                    onSendImage={handleSendImage}
                />
            </div>

        </div>
    )
}