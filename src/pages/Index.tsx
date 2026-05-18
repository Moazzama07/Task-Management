import { Star, Clock, ChevronLeft, ChevronRight, MoreHorizontal, } from "lucide-react"
import { useState } from "react"

// ── helpers ───────────────────────────────────────────────────────────────────
const MENTORS = [
    {
        id: 1,
        name: "Curious George",
        role: "UI/UX Design",
        tasks: 40,
        rating: 4.7,
        reviews: 750,
        avatar: "https://i.pravatar.cc/48?img=11",
        following: false,
    },
    {
        id: 2,
        name: "Abraham Lincoln",
        role: "3D Design",
        tasks: 32,
        rating: 4.9,
        reviews: 510,
        avatar: "https://i.pravatar.cc/48?img=52",
        following: true,
    },
]

const UPCOMING = [
    {
        id: 1,
        title: "Creating Mobile App Design",
        category: "UI/UX Design",
        progress: 75,
        daysLeft: 3,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&q=80",
        avatars: ["https://i.pravatar.cc/24?img=1", "https://i.pravatar.cc/24?img=2", "https://i.pravatar.cc/24?img=3"],
    },
    {
        id: 2,
        title: "Creating Perfect Website",
        category: "Web Developer",
        progress: 85,
        daysLeft: 4,
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&q=80",
        avatars: ["https://i.pravatar.cc/24?img=4", "https://i.pravatar.cc/24?img=5", "https://i.pravatar.cc/24?img=6"],
    },
]

const DETAIL_TASKS = [
    "Understanding the tools in Figma",
    "Understand the basics of making designs",
    "Design a mobile application with figma",
]

// ── Calendar mini ─────────────────────────────────────────────────────────────
const MONTH_DAYS = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
]
const WEEK_HEADERS = ["S", "M", "T", "W", "T", "F", "S"]

function MiniCalendar() {
    const [month] = useState("July 2022")
    return (
        <div className="rounded-2xl bg-white border border-[#E8E8ED] p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <button className="text-[#C5C5D0] hover:text-[#3C3C46]"><ChevronLeft size={14} /></button>
                <p className="text-xs font-semibold text-[#3C3C46]">{month}</p>
                <button className="text-[#C5C5D0] hover:text-[#3C3C46]"><ChevronRight size={14} /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {WEEK_HEADERS.map((d, i) => (
                    <span key={i} className="text-[10px] text-[#C5C5D0] font-medium">{d}</span>
                ))}
                {MONTH_DAYS.flat().map((d, i) => (
                    <span
                        key={i}
                        className={`text-[11px] w-6 h-6 flex items-center justify-center rounded-full mx-auto
              ${d === 14 ? "bg-[#4F6EF7] text-white font-bold" : d === 19 ? "bg-[#3C3C46] text-white font-bold" : "text-[#3C3C46]"}
              ${!d ? "opacity-0 pointer-events-none" : "cursor-pointer hover:bg-[#F0F2FF]"}`}
                    >
                        {d ?? ""}
                    </span>
                ))}
            </div>
        </div>
    )
}

// ── Task Today card ───────────────────────────────────────────────────────────
function TaskToday() {
    return (
        <div className="rounded-2xl bg-white border border-[#E8E8ED] shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <p className="text-sm font-semibold text-[#3C3C46]">Task Today</p>
                <MoreHorizontal size={16} className="text-[#C5C5D0]" />
            </div>
            <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80"
                alt="task"
                className="w-full h-28 object-cover"
            />
            <div className="p-4 space-y-2">
                <p className="text-xs font-semibold text-[#4F6EF7]">UI/UX Designer</p>
                <p className="text-sm font-bold text-[#3C3C46] leading-tight">Creating Awesome Mobile Apps</p>
                <div className="flex items-center gap-1 text-xs text-[#9999A8]">
                    <div className="w-2 h-2 rounded-full bg-[#4F6EF7]" />
                    <span>Progress</span>
                    <span className="ml-auto text-[#4F6EF7] font-semibold">90%</span>
                </div>
                <div className="w-full bg-[#F0F2FF] rounded-full h-1.5">
                    <div className="bg-[#4F6EF7] h-1.5 rounded-full" style={{ width: "90%" }} />
                </div>
                <div className="flex items-center gap-1 text-xs text-[#9999A8]">
                    <Clock size={11} />
                    <span>1 Hour</span>
                    <div className="ml-auto flex -space-x-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <img key={i} src={`https://i.pravatar.cc/20?img=${i}`} alt="" className="w-5 h-5 rounded-full border border-white" />
                        ))}
                    </div>
                </div>
            </div>
            {/* Detail Task */}
            <div className="border-t border-[#E8E8ED] px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-[#3C3C46]">Detail Task</p>
                    <p className="text-[10px] text-[#4F6EF7]">UI/UX Designer</p>
                </div>
                <ol className="space-y-1.5">
                    {DETAIL_TASKS.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#9999A8]">
                            <span className="w-4 h-4 rounded-full bg-[#F0F2FF] text-[#4F6EF7] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                            </span>
                            {t}
                        </li>
                    ))}
                </ol>
                <button className="mt-3 w-full bg-[#4F6EF7] hover:bg-[#3A57E8] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors">
                    Go To Detail
                </button>
            </div>
        </div>
    )
}

// ── main ──────────────────────────────────────────────────────────────────────
export default function Index() {
    return (
        <div className="space-y-5">
            {/* ── Monthly Mentors ── */}
            <div className="rounded-2xl bg-white border border-[#E8E8ED] p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-[#3C3C46]">Monthly Mentors</p>
                    <div className="flex gap-1">
                        <button className="w-7 h-7 rounded-full border border-[#E8E8ED] flex items-center justify-center text-[#9999A8] hover:bg-[#F5F5F8]">
                            <ChevronLeft size={13} />
                        </button>
                        <button className="w-7 h-7 rounded-full border border-[#E8E8ED] flex items-center justify-center text-[#9999A8] hover:bg-[#F5F5F8]">
                            <ChevronRight size={13} />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MENTORS.map((m) => (
                        <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl border border-[#E8E8ED] hover:border-[#4F6EF7]/30 transition-colors">
                            <img src={m.avatar} alt={m.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#3C3C46] truncate">{m.name}</p>
                                <p className="text-xs text-[#9999A8]">{m.role}</p>
                                <div className="flex items-center gap-2 mt-1 text-[11px] text-[#9999A8]">
                                    <span>{m.tasks} Task</span>
                                    <span className="flex items-center gap-0.5 text-amber-400">
                                        <Star size={10} fill="currentColor" />
                                        {m.rating}
                                    </span>
                                    <span className="text-[#C5C5D0]">({m.reviews} Reviews)</span>
                                </div>
                            </div>
                            <button
                                className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 transition-colors
                  ${m.following
                                        ? "bg-[#E8E8ED] text-[#9999A8]"
                                        : "bg-[#4F6EF7] text-white hover:bg-[#3A57E8]"}`}
                            >
                                {m.following ? "Followed" : "+ Follow"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Upcoming Task ── */}
            <div className="rounded-2xl bg-white border border-[#E8E8ED] p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-[#3C3C46]">Upcoming Task</p>
                    <div className="flex gap-1">
                        <button className="w-7 h-7 rounded-full border border-[#E8E8ED] flex items-center justify-center text-[#9999A8] hover:bg-[#F5F5F8]">
                            <ChevronLeft size={13} />
                        </button>
                        <button className="w-7 h-7 rounded-full border border-[#E8E8ED] flex items-center justify-center text-[#9999A8] hover:bg-[#F5F5F8]">
                            <ChevronRight size={13} />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {UPCOMING.map((t) => (
                        <div key={t.id} className="rounded-xl border border-[#E8E8ED] overflow-hidden hover:shadow-md transition-shadow">
                            <img src={t.image} alt={t.title} className="w-full h-32 object-cover" />
                            <div className="p-3 space-y-2">
                                <p className="text-xs text-[#4F6EF7] font-medium">{t.category}</p>
                                <p className="text-sm font-semibold text-[#3C3C46] leading-tight">{t.title}</p>
                                <div className="flex items-center justify-between text-xs text-[#9999A8]">
                                    <span>Progress</span>
                                    <span className="text-[#4F6EF7] font-semibold">{t.progress}%</span>
                                </div>
                                <div className="w-full bg-[#F0F2FF] rounded-full h-1.5">
                                    <div className="bg-[#4F6EF7] h-1.5 rounded-full" style={{ width: `${t.progress}%` }} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-xs text-[#9999A8]">
                                        <Clock size={11} />
                                        <span>{t.daysLeft} Days Left</span>
                                    </div>
                                    <div className="flex -space-x-1">
                                        {t.avatars.map((a, i) => (
                                            <img key={i} src={a} alt="" className="w-5 h-5 rounded-full border border-white object-cover" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Calendar + Task Today (side by side on lg) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <MiniCalendar />
                <TaskToday />
            </div>
        </div>
    )
}