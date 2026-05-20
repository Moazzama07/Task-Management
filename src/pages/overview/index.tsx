import { TrendingUp } from "lucide-react"
import MonthlyMentors from "./monthlyMentors"
import UpccomingTask from "./upccomingTask"
import TaskToday, { MiniCalendar } from "./taskToday"

// ── Sparkline ─────────────────────────────────────────────────
const activityPoints = [1.2, 2.4, 1.8, 3.2, 2.0, 2.8, 1.5]
const dayLabels = ["S", "M", "T", "W", "T", "F", "S"]

function SparkLine() {
    const w = 260, h = 90, pad = 10
    const xs = activityPoints.map(
        (_, i) => pad + (i * (w - pad * 2)) / (activityPoints.length - 1)
    )
    const max = Math.max(...activityPoints)
    const ys = activityPoints.map((v) => h - pad - (v / max) * (h - pad * 2))
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

export default function Overview() {
    return (
        <div className="flex flex-col lg:flex-row gap-5 items-start">

            {/* ════════ LEFT COLUMN ════════ */}
            <div className="flex-1 min-w-0 space-y-5">

                {/* Greeting */}
                <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-6 py-5">
                    <p className="text-[10px] text-[#9999A8] font-semibold uppercase tracking-widest mb-1">
                        Welcome Back
                    </p>
                    <h2 className="text-xl font-bold text-[#1A1A2E]">Hi, Skylar Dias 👋</h2>
                    <p className="text-xs text-[#9999A8] mt-0.5">Let's finish your task today!</p>
                </div>

                {/* Running Task + Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-[194px_minmax(0,1fr)] gap-[18px]">

                    {/* Running Task */}
                    <div className="rounded-2xl bg-[#141522] text-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.10)]">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-3">
                            Running Task
                        </p>
                        <div className="flex items-center gap-4">
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
                                    <TrendingUp className="h-3 w-3" />
                                    <span>+12% this week</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity */}
                    <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-[#1A1A2E]">Activity</p>
                            <span className="text-[11px] text-[#4F6EF7] font-medium cursor-pointer bg-[#F0F2FF] px-2.5 py-1 rounded-lg select-none">
                                This Week ▾
                            </span>
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

                {/* Monthly Mentors */}
                <MonthlyMentors />

                {/* Upcoming Task */}
                <UpccomingTask />

            </div>

            {/* ════════ RIGHT SIDEBAR ════════ */}
            <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0 space-y-4">
                <MiniCalendar />
                <TaskToday />
            </div>

        </div>
    )
}