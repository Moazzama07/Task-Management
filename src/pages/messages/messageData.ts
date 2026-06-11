export interface Contact {
    id: string
    name: string
    avatar: string        // initials fallback
    avatarImg: string     // pravatar URL
    lastMessage: string
    time: string
    isOnline?: boolean
    unread?: boolean
    readStatus?: "sent" | "delivered" | "read"
}

export interface ChatMessage {
    id: string
    text?: string
    /** either a data-URL (user-uploaded) or the sentinel "dashboard-preview" */
    image?: string
    imageCaption?: string
    time: string
    isMine: boolean
    dateLabel?: string
}

export const contacts: Contact[] = [
    {
        id: "1",
        name: "Angelie Crison",
        avatar: "AC",
        avatarImg: "https://i.pravatar.cc/40?img=1",
        lastMessage: "Thank you very much, I'm glad...",
        time: "1m Ago",
        isOnline: true,
        unread: true,
    },
    {
        id: "2",
        name: "Jakob Saris",
        avatar: "JS",
        avatarImg: "https://i.pravatar.cc/40?img=3",
        lastMessage: "You: Sure let me tell you about w...",
        time: "2m Ago",
        readStatus: "read",
    },
    {
        id: "3",
        name: "Emery Korsgard",
        avatar: "EK",
        avatarImg: "https://i.pravatar.cc/40?img=5",
        lastMessage: "Thank's. You are very helpful...",
        time: "3m Ago",
        unread: true,
    },
    {
        id: "4",
        name: "Jeremy Zucker",
        avatar: "JZ",
        avatarImg: "https://i.pravatar.cc/40?img=7",
        lastMessage: "You: Sure let me teach you about...",
        time: "4m Ago",
        readStatus: "delivered",
    },
    {
        id: "5",
        name: "Nadia Lauren",
        avatar: "NL",
        avatarImg: "https://i.pravatar.cc/40?img=9",
        lastMessage: "Is there anything I can help? Just...",
        time: "5m Ago",
        unread: true,
    },
    {
        id: "6",
        name: "Jason Statham",
        avatar: "JS",
        avatarImg: "https://i.pravatar.cc/40?img=11",
        lastMessage: "You: Sure let me share about...",
        time: "6m Ago",
        readStatus: "read",
    },
    {
        id: "7",
        name: "Angel Kimberly",
        avatar: "AK",
        avatarImg: "https://i.pravatar.cc/40?img=13",
        lastMessage: "Okay, I know very well about it...",
        time: "7m Ago",
        unread: true,
    },
    {
        id: "8",
        name: "Jason Momoa",
        avatar: "JM",
        avatarImg: "https://i.pravatar.cc/40?img=15",
        lastMessage: "You: Sure let me tell you about...",
        time: "7m Ago",
        readStatus: "delivered",
    },
]

export const chatMessages: ChatMessage[] = [
    {
        id: "1",
        dateLabel: "Today",
        text: "Morning Angelie, I have question about My Task",
        time: "Today 11:52",
        isMine: true,
    },
    {
        id: "2",
        text: "Yes sure. Any problem with your assignment?",
        time: "Today 11:53",
        isMine: false,
    },
    {
        id: "3",
        image: "dashboard-preview",
        imageCaption: "How to make a responsive display from the dashboard?",
        time: "Today 11:52",
        isMine: true,
    },
    {
        id: "4",
        text: "Is there a plugin to do this task?",
        time: "Today 11:52",
        isMine: true,
    },
    {
        id: "5",
        text: "No plugins. You just have to make it smaller according to the size of the phone.",
        time: "",
        isMine: false,
    },
    {
        id: "6",
        text: "Thank you very much. I'm glad you asked about the assignment",
        time: "Today 11:53",
        isMine: false,
    },
]