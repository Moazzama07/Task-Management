import { Clock, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// ── Mini Calendar ─────────────────────────────────────────────
const CAL_ROWS = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
]

export function MiniCalendar() {
    return (
        <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4">
            <div className="flex items-center justify-between mb-3">
                <button className="w-6 h-6 flex items-center justify-center text-[#C5C5D0] hover:text-[#1A1A2E] transition-colors">
                    <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <p className="text-xs font-semibold text-[#1A1A2E]">July 2022</p>
                <button className="w-6 h-6 flex items-center justify-center text-[#C5C5D0] hover:text-[#1A1A2E] transition-colors">
                    <ChevronRight className="h-3.5 w-3.5" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-y-1 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <span key={i} className="text-[9px] text-[#C5C5D0] font-semibold pb-1">{d}</span>
                ))}
                {CAL_ROWS.flat().map((d, i) => (
                    <span
                        key={i}
                        className={`text-[11px] w-6 h-6 flex items-center justify-center rounded-full mx-auto font-medium transition-colors
              ${d === 14 ? "bg-[#4F6EF7] text-white"
                                : d === 19 ? "bg-[#1A1A2E] text-white"
                                    : d ? "text-[#1A1A2E] hover:bg-[#F0F2FF] cursor-pointer"
                                        : "opacity-0 pointer-events-none"}`}
                    >
                        {d ?? ""}
                    </span>
                ))}
            </div>
        </div>
    )
}

// ── Task Today ────────────────────────────────────────────────
const DETAIL_TASKS = [
    "Understanding the tools in Figma",
    "Understand the basics of making designs",
    "Design a mobile application with figma",
]

export default function TaskToday() {
    return (
        <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <p className="text-sm font-semibold text-[#1A1A2E]">Task Today</p>
                <button className="text-[#C5C5D0] hover:text-[#1A1A2E] transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                </button>
            </div>

            {/* Image */}
            <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80"
                alt="task"
                className="w-full h-24 object-cover"
            />

            {/* Body */}
            <div className="p-4 space-y-2">
                <p className="text-[10px] font-semibold text-[#4F6EF7] uppercase tracking-wide">
                    UI/UX Designer
                </p>
                <p className="text-sm font-bold text-[#1A1A2E] leading-snug">
                    Creating Awesome Mobile Apps
                </p>

                {/* Progress */}
                <div className="flex items-center justify-between text-xs text-[#9999A8]">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#4F6EF7]" />
                        <span>Progress</span>
                    </div>
                    <span className="text-[#4F6EF7] font-semibold">90%</span>
                </div>
                <div className="w-full bg-[#EEF1FE] rounded-full h-1.5">
                    <div className="bg-[#4F6EF7] h-1.5 rounded-full" style={{ width: "90%" }} />
                </div>

                {/* Time + Avatars */}
                <div className="flex items-center gap-1 text-xs text-[#9999A8]">
                    <Clock className="h-3 w-3" />
                    <span>1 Hour</span>
                    <div className="ml-auto flex -space-x-1.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Avatar key={i} className="h-5 w-5 border-2 border-white">
                                <AvatarImage src={`https://i.pravatar.cc/20?img=${i}`} />
                                <AvatarFallback className="text-[8px]">{i}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detail Task */}
            <div className="border-t border-[#F0F0F5] px-4 py-3">
                <div className="flex items-center justify-between mb-2.5">
                    <p className="text-xs font-semibold text-[#1A1A2E]">Detail Task</p>
                    <p className="text-[10px] text-[#4F6EF7]">UI/UX Designer</p>
                </div>
                <ol className="space-y-2">
                    {DETAIL_TASKS.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#9999A8]">
                            <span className="w-4 h-4 rounded-full bg-[#EEF1FE] text-[#4F6EF7] text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
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