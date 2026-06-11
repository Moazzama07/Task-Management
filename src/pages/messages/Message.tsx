import { Search, CheckCheck, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Contact } from "./messageData"

// ─── Read receipt icon ──────────────────────────────────────────────────────
function ReadStatus({ status }: { status: "sent" | "delivered" | "read" | undefined }) {
    if (!status) return null
    if (status === "read") return <CheckCheck size={12} className="text-[#5C5CE5]" />
    if (status === "delivered") return <CheckCheck size={12} className="text-[#9898A6]" />
    return <Check size={12} className="text-[#9898A6]" />
}

// ─── Contact row ────────────────────────────────────────────────────────────
interface ContactRowProps {
    contact: Contact
    isActive: boolean
    onClick: () => void
}

function ContactRow({ contact, isActive, onClick }: ContactRowProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${isActive ? "bg-[#F0F0FB]" : "hover:bg-[#F5F5FA]"
                }`}
        >
            {/* Avatar with online dot */}
            <div className="relative flex-shrink-0">
                <Avatar className="w-10 h-10 border border-[#EBEBF0]">
                    <AvatarImage src={contact.avatarImg} alt={contact.name} />
                    <AvatarFallback className="text-xs font-semibold bg-[#EEF1FE] text-[#5C5CE5]">
                        {contact.avatar}
                    </AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
                )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-semibold text-[#3C3C46] truncate">{contact.name}</span>
                    <span className="text-[10px] text-[#9898A6] flex-shrink-0 ml-2">{contact.time}</span>
                </div>
                <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 min-w-0">
                        <ReadStatus status={contact.readStatus} />
                        <span className="text-xs text-[#9898A6] truncate">{contact.lastMessage}</span>
                    </div>
                    {contact.unread && (
                        <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0" />
                    )}
                </div>
            </div>
        </button>
    )
}

// ─── Main export ────────────────────────────────────────────────────────────
interface MessageProps {
    contacts: Contact[]
    activeId: string
    searchQuery: string
    onSearchChange: (v: string) => void
    onSelectContact: (id: string) => void
}

export default function Message({
    contacts,
    activeId,
    searchQuery,
    onSearchChange,
    onSelectContact,
}: MessageProps) {
    const filtered = contacts.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Search — fixed at top */}
            <div className="px-4 pt-4 pb-3 flex-shrink-0">
                <div className="flex items-center gap-2 bg-[#F5F5FA] rounded-xl px-3 py-2.5">
                    <Search size={15} className="text-[#9898A6] flex-shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search Name"
                        className="flex-1 bg-transparent text-sm text-[#3C3C46] placeholder:text-[#B0B0C0] outline-none"
                    />
                </div>
            </div>

            {/* Scrollable contact list */}
            <div className="flex-1 overflow-y-auto px-2 pb-4 min-h-0">
                {filtered.length === 0 ? (
                    <p className="text-center text-sm text-[#9898A6] mt-8">No contacts found</p>
                ) : (
                    filtered.map((contact) => (
                        <ContactRow
                            key={contact.id}
                            contact={contact}
                            isActive={contact.id === activeId}
                            onClick={() => onSelectContact(contact.id)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}