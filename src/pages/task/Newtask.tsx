// ─── Types ────────────────────────────────────────────────────────────────────

export interface Task {
    id: number
    title: string
    category: string
    progress: number
    timeLeft: string
    image: string
    avatars: string[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const NEW_TASKS: Task[] = [
    {
        id: 6,
        title: "Creating Mobile App Design",
        category: "UI/UX Design",
        progress: 75,
        timeLeft: "3 Days Left",
        image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=400&h=200&fit=crop",
        avatars: ["https://i.pravatar.cc/40?img=13", "https://i.pravatar.cc/40?img=14", "https://i.pravatar.cc/40?img=15"],
    },
    {
        id: 7,
        title: "Creating Perfect Website",
        category: "Web Developer",
        progress: 85,
        timeLeft: "4 Days Left",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
        avatars: ["https://i.pravatar.cc/40?img=16", "https://i.pravatar.cc/40?img=17"],
    },
    {
        id: 8,
        title: "Mobile App Design",
        category: "UI/UX Design",
        progress: 65,
        timeLeft: "3 Days Left",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop",
        avatars: ["https://i.pravatar.cc/40?img=18", "https://i.pravatar.cc/40?img=19", "https://i.pravatar.cc/40?img=20"],
    },
    {
        id: 9,
        title: "Dashboard Analytics App",
        category: "Frontend",
        progress: 48,
        timeLeft: "1 Day Left",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
        avatars: ["https://i.pravatar.cc/40?img=21", "https://i.pravatar.cc/40?img=22"],
    },
    {
        id: 10,
        title: "Android Dev Project",
        category: "Android Dev",
        progress: 30,
        timeLeft: "5 Days Left",
        image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=200&fit=crop",
        avatars: ["https://i.pravatar.cc/40?img=23", "https://i.pravatar.cc/40?img=24", "https://i.pravatar.cc/40?img=25"],
    },
]