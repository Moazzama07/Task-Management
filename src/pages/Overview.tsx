import { Star, Clock, ChevronLeft, ChevronRight, MoreHorizontal, TrendingUp } from "lucide-react"
import { useState } from "react"

// ─────────────────────────────────────────────────────────────
// SPARKLINE
// ─────────────────────────────────────────────────────────────
const activityPoints = [1.2, 2.4, 1.8, 3.2, 2.0, 2.8, 1.5]
const dayLabels = ["S", "M", "T", "W", "T", "F", "S"]

function SparkLine() {
    const w = 260, h = 90, pad = 10
    const xs = activityPoints.map((_, i) => pad + (i * (w - pad * 2)) / (activityPoints.length - 1))
    const max = Math.max(...activityPoints)
    const ys = activityPoints.map((v) => h - pad - ((v / max) * (h - pad * 2)))
    const d = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ")
    const area = `${d} L${xs[xs.length - 1]},${h} L${xs[0]},${h} Z`
    const dot = { x: xs[1], y: ys[1] }

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
            <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F6EF7" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#4F6EF7" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={area} fill="url(#sg)" />
            <path d={d} fill="none" stroke="#4F6EF7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={dot.x} cy={dot.y} r="5" fill="#4F6EF7" />
            <circle cx={dot.x} cy={dot.y} r="10" fill="#4F6EF7" fillOpacity="0.12" />
            <rect x={dot.x - 24} y={dot.y - 26} width="48" height="17" rx="4" fill="#3C3C46" />
            <text x={dot.x} y={dot.y - 14} textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="600">
                2 Task
            </text>
        </svg>
    )
}

// ─────────────────────────────────────────────────────────────
// MINI CALENDAR
// ─────────────────────────────────────────────────────────────
const CAL_ROWS = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
]

function MiniCalendar() {
    return (
        <div className="rounded-2xl bg-white border border-[#E8E8ED] p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <button className="text-[#C5C5D0] hover:text-[#3C3C46] transition-colors"><ChevronLeft size={13} /></button>
                <p className="text-xs font-semibold text-[#3C3C46]">July 2022</p>
                <button className="text-[#C5C5D0] hover:text-[#3C3C46] transition-colors"><ChevronRight size={13} /></button>
            </div>
            <div className="grid grid-cols-7 gap-y-1 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <span key={i} className="text-[9px] text-[#C5C5D0] font-semibold pb-1">{d}</span>
                ))}
                {CAL_ROWS.flat().map((d, i) => (
                    <span key={i}
                        className={`text-[11px] w-6 h-6 flex items-center justify-center rounded-full mx-auto font-medium
              ${d === 14 ? "bg-[#4F6EF7] text-white" :
                                d === 19 ? "bg-[#3C3C46] text-white" :
                                    d ? "text-[#3C3C46] hover:bg-[#F0F2FF] cursor-pointer" : "opacity-0 pointer-events-none"}`}
                    >{d ?? ""}</span>
                ))}
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// TASK TODAY (right column bottom)
// ─────────────────────────────────────────────────────────────
const DETAIL_TASKS = [
    "Understanding the tools in Figma",
    "Understand the basics of making designs",
    "Design a mobile application with figma",
]

function TaskToday() {
    return (
        <div className="rounded-2xl bg-white border border-[#E8E8ED] shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <p className="text-sm font-semibold text-[#3C3C46]">Task Today</p>
                <MoreHorizontal size={15} className="text-[#C5C5D0]" />
            </div>
            <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80"
                alt="task"
                className="w-full h-24 object-cover"
            />
            <div className="p-4 space-y-2 flex-1">
                <p className="text-[10px] font-semibold text-[#4F6EF7] uppercase tracking-wide">UI/UX Designer</p>
                <p className="text-sm font-bold text-[#3C3C46] leading-snug">Creating Awesome Mobile Apps</p>

                {/* progress */}
                <div className="flex items-center justify-between text-xs text-[#9999A8]">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#4F6EF7]" />
                        <span>Progress</span>
                    </div>
                    <span className="text-[#4F6EF7] font-semibold">90%</span>
                </div>
                <div className="w-full bg-[#F0F2FF] rounded-full h-1.5">
                    <div className="bg-[#4F6EF7] h-1.5 rounded-full" style={{ width: "90%" }} />
                </div>

                {/* time + avatars */}
                <div className="flex items-center gap-1 text-xs text-[#9999A8]">
                    <Clock size={11} />
                    <span>1 Hour</span>
                    <div className="ml-auto flex -space-x-1.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <img key={i} src={`https://i.pravatar.cc/20?img=${i}`} alt="" className="w-5 h-5 rounded-full border-2 border-white object-cover" />
                        ))}
                    </div>
                </div>
            </div>

            {/* detail tasks */}
            <div className="border-t border-[#E8E8ED] px-4 py-3">
                <div className="flex items-center justify-between mb-2.5">
                    <p className="text-xs font-semibold text-[#3C3C46]">Detail Task</p>
                    <p className="text-[10px] text-[#4F6EF7]">UI/UX Designer</p>
                </div>
                <ol className="space-y-2">
                    {DETAIL_TASKS.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#9999A8]">
                            <span className="w-4 h-4 rounded-full bg-[#F0F2FF] text-[#4F6EF7] text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                            </span>
                            <span className="leading-tight">{t}</span>
                        </li>
                    ))}
                </ol>
                <button className="mt-3 w-full bg-[#4F6EF7] hover:bg-[#3A57E8] active:bg-[#2F49D0] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors">
                    Go To Detail
                </button>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const MENTORS_DATA = [
    { id: 1, name: "Curious George", role: "UI/UX Design", tasks: 40, rating: 4.7, reviews: 750, avatar: "https://i.pravatar.cc/48?img=11", following: false },
    { id: 2, name: "Abraham Lincoln", role: "3D Design", tasks: 32, rating: 4.9, reviews: 510, avatar: "https://i.pravatar.cc/48?img=52", following: true },
]

const UPCOMING_DATA = [
    {
        id: 1, title: "Creating Mobile App Design", category: "UI/UX Design", progress: 75, daysLeft: 3,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&q=80",
        avatars: ["https://i.pravatar.cc/24?img=1", "https://i.pravatar.cc/24?img=2", "https://i.pravatar.cc/24?img=3"],
    },
    {
        id: 2, title: "Creating Perfect Website", category: "Web Developer", progress: 85, daysLeft: 4,
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&q=80",
        avatars: ["https://i.pravatar.cc/24?img=4", "https://i.pravatar.cc/24?img=5", "https://i.pravatar.cc/24?img=6"],
    },
]

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function Overview() {
    const [mentors, setMentors] = useState(MENTORS_DATA)

    const toggleFollow = (id: number) =>
        setMentors((prev) => prev.map((m) => m.id === id ? { ...m, following: !m.following } : m))

    return (
        <div className="flex flex-col lg:flex-row gap-5 items-start">

            {/* ════════════════════════════════════════
          LEFT / MAIN COLUMN
      ════════════════════════════════════════ */}
            <div className="flex-1 min-w-0 space-y-5">

                {/* ── GREETING ── */}
                <div className="flex items-center justify-between rounded-2xl bg-white border border-[#E8E8ED] px-6 py-5 shadow-sm">
                    <div>
                        <p className="text-[10px] text-[#9999A8] font-semibold uppercase tracking-widest mb-1">Welcome Back</p>
                        <h2 className="text-xl font-bold text-[#3C3C46]">Hi, Skylar Dias 👋</h2>
                        <p className="text-xs text-[#9999A8] mt-0.5">Let's finish your task today!</p>
                    </div>

                </div>

                {/* ── RUNNING TASK + ACTIVITY (side by side) ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[194px_minmax(0,1fr)] gap-[18px]">

                    {/* Running Task */}
                    <div className="rounded-2xl bg-[#141522] text-white p-4 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-3">Running Task</p>
                        <div className="flex items-center gap-4">
                            {/* donut */}
                            <div className="relative w-[62px] h-[62px] shrink-0">
                                <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
                                    <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="9" />
                                    <circle cx="36" cy="36" r="28" fill="none" stroke="#4F6EF7" strokeWidth="9"
                                        strokeDasharray={`${2 * Math.PI * 28 * 0.45} ${2 * Math.PI * 28 * 0.55}`}
                                        strokeLinecap="round" />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">45%</span>
                            </div>
                            <div>
                                <p className="text-3xl font-extrabold leading-none">65</p>
                                <p className="text-xs text-white/40 mt-1">
                                    of <span className="text-white font-semibold">100</span> Task
                                </p>
                                <div className="mt-2 flex items-center gap-1 text-[#4F6EF7] text-[11px] font-medium">
                                    <TrendingUp size={11} />
                                    <span>+12% this week</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity */}
                    <div className="rounded-2xl bg-white border border-[#E8E8ED] p-5 shadow-sm flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-[#3C3C46]">Activity</p>
                            <span className="text-[11px] text-[#4F6EF7] font-medium cursor-pointer select-none">This Week ▾</span>
                        </div>
                        <div className="flex gap-1 items-end">
                            <div className="flex flex-col justify-between text-[9px] text-[#C5C5D0] h-[90px] pr-1 shrink-0 py-1">
                                <span>3</span><span>2</span><span>1</span>
                            </div>
                            <div className="flex-1"><SparkLine /></div>
                        </div>
                        <div className="flex justify-between text-[9px] text-[#C5C5D0] pl-4">
                            {dayLabels.map((d, i) => <span key={i}>{d}</span>)}
                        </div>
                    </div>
                </div>

                {/* ── MONTHLY MENTORS ── */}
                <div className="rounded-2xl bg-white border border-[#E8E8ED] p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-semibold text-[#3C3C46]">Monthly Mentors</p>
                        <div className="flex gap-1">
                            {[ChevronLeft, ChevronRight].map((Icon, i) => (
                                <button key={i} className="w-7 h-7 rounded-full border border-[#E8E8ED] flex items-center justify-center text-[#9999A8] hover:bg-[#F5F5F8] transition-colors">
                                    <Icon size={12} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {mentors.map((m) => (
                            <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl border border-[#E8E8ED] hover:border-[#4F6EF7]/40 transition-colors">
                                <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#3C3C46] truncate">{m.name}</p>
                                    <p className="text-[11px] text-[#9999A8]">{m.role}</p>
                                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#9999A8]">
                                        <span>{m.tasks} Task</span>
                                        <span className="flex items-center gap-0.5 text-amber-400">
                                            <Star size={9} fill="currentColor" />{m.rating}
                                        </span>
                                        <span className="text-[#C5C5D0]">({m.reviews})</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleFollow(m.id)}
                                    className={`text-[11px] font-semibold px-3 py-1 rounded-full shrink-0 transition-colors
                    ${m.following ? "bg-[#F0F2FF] text-[#4F6EF7]" : "bg-[#4F6EF7] text-white hover:bg-[#3A57E8]"}`}
                                >
                                    {m.following ? "Followed" : "+ Follow"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── UPCOMING TASKS ── */}
                <div className="rounded-2xl bg-white border border-[#E8E8ED] p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-semibold text-[#3C3C46]">Upcoming Task</p>
                        <div className="flex gap-1">
                            {[ChevronLeft, ChevronRight].map((Icon, i) => (
                                <button key={i} className="w-7 h-7 rounded-full border border-[#E8E8ED] flex items-center justify-center text-[#9999A8] hover:bg-[#F5F5F8] transition-colors">
                                    <Icon size={12} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {UPCOMING_DATA.map((t) => (
                            <div key={t.id} className="rounded-xl border border-[#E8E8ED] overflow-hidden hover:shadow-md transition-shadow">
                                <img src={t.image} alt={t.title} className="w-full h-28 object-cover" />
                                <div className="p-3 space-y-1.5">
                                    <p className="text-[11px] text-[#4F6EF7] font-semibold">{t.category}</p>
                                    <p className="text-sm font-semibold text-[#3C3C46] leading-snug">{t.title}</p>
                                    <div className="flex items-center justify-between text-xs text-[#9999A8]">
                                        <span>Progress</span>
                                        <span className="text-[#4F6EF7] font-semibold">{t.progress}%</span>
                                    </div>
                                    <div className="w-full bg-[#F0F2FF] rounded-full h-1.5">
                                        <div className="bg-[#4F6EF7] h-1.5 rounded-full" style={{ width: `${t.progress}%` }} />
                                    </div>
                                    <div className="flex items-center justify-between pt-0.5">
                                        <div className="flex items-center gap-1 text-xs text-[#9999A8]">
                                            <Clock size={10} /><span>{t.daysLeft} Days Left</span>
                                        </div>
                                        <div className="flex -space-x-1.5">
                                            {t.avatars.map((a, i) => (
                                                <img key={i} src={a} alt="" className="w-5 h-5 rounded-full border-2 border-white object-cover" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>{/* end left column */}

            {/* ════════════════════════════════════════
          RIGHT SIDEBAR COLUMN
          Calendar on top, Task Today below
      ════════════════════════════════════════ */}
            <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0 space-y-4">
                <MiniCalendar />
                <TaskToday />
            </div>

        </div>
    )
}