import { useState, useRef, MouseEvent } from "react"
import MonthlyMentors from "./monthlyMentors"
import UpccomingTask from "./upccomingTask"
import TaskToday, { MiniCalendar } from "./taskToday"
import { ChevronDown } from "lucide-react"

const initialPoints = [0.4, 1.1, 0.3, 2.0, 0.2, 1.4, 0.1]
const dayLabels = ["S", "M", "T", "W", "T", "F", "S"]

function SparkLine() {
    const w = 600
    const h = 120
    const padX = 20
    const padY = 16

    const svgRef = useRef<SVGSVGElement>(null)

    const [points, setPoints] = useState<number[]>(initialPoints)
    const [activeIndex, setActiveIndex] = useState<number>(3)
    const [isHovered, setIsHovered] = useState<boolean>(false)

    const currentPoints = isHovered ? points : initialPoints
    const currentActiveIndex = isHovered ? activeIndex : 3

    const max = 4

    const xs = currentPoints.map(
        (_, i) => padX + (i * (w - padX * 2)) / (currentPoints.length - 1)
    )

    const ys = currentPoints.map(
        (v) => h - padY - (v / max) * (h - padY * 2)
    )

    const d = xs
        .map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`)
        .join(" ")

    const area = `
        ${d}
        L ${xs[xs.length - 1]} ${h}
        L ${xs[0]} ${h}
        Z
    `

    const handleSvgInteraction = (e: MouseEvent<SVGSVGElement>) => {
        if (!svgRef.current) return

        setIsHovered(true)

        const rect = svgRef.current.getBoundingClientRect()
        const clickX = ((e.clientX - rect.left) / rect.width) * w
        const clickY = ((e.clientY - rect.top) / rect.height) * h

        let closestIndex = 0

        xs.forEach((x, i) => {
            if (
                Math.abs(clickX - x) <
                Math.abs(clickX - xs[closestIndex])
            ) {
                closestIndex = i
            }
        })

        if (e.type === "click") {
            const value =
                ((h - padY - clickY) / (h - padY * 2)) * max

            const updated = [...points]
            updated[closestIndex] = Number(
                Math.max(0.5, Math.min(max, value)).toFixed(1)
            )

            setPoints(updated)
        }

        setActiveIndex(closestIndex)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        setPoints(initialPoints)
    }

    const activeX = xs[currentActiveIndex]
    const activeY = ys[currentActiveIndex]

    const activeTasks =
        Math.round(currentPoints[currentActiveIndex]) || 2

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${w} ${h}`}
            className="w-full h-full cursor-pointer"
            preserveAspectRatio="none"
            onMouseMove={handleSvgInteraction}
            onClick={handleSvgInteraction}
            onMouseLeave={handleMouseLeave}
        >
            <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset="0%"
                        stopColor="#1A1A2E"
                        stopOpacity="0.08"
                    />
                    <stop
                        offset="100%"
                        stopColor="#1A1A2E"
                        stopOpacity="0"
                    />
                </linearGradient>
            </defs>

            <path d={area} fill="url(#sg)" />

            <path
                d={d}
                fill="none"
                stroke="#1A1A2E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <circle
                cx={activeX}
                cy={activeY}
                r="10"
                fill="#1A1A2E"
                fillOpacity="0.12"
            />

            <circle
                cx={activeX}
                cy={activeY}
                r="5"
                fill="#1A1A2E"
                stroke="white"
                strokeWidth="2"
            />

            {/* Tooltip */}
            <g>
                <rect
                    x={activeX - 45}
                    y={activeY - 48}
                    width="90"
                    height="32"
                    rx="10"
                    fill="#1A1A2E" />

                <polygon
                    points={`
                        ${activeX - 6},${activeY - 16}
                        ${activeX + 6},${activeY - 16}
                        ${activeX},${activeY - 9}
                    `}
                    fill="#1A1A2E"
                />

                <text
                    x={activeX}
                    y={activeY - 27}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="600"
                >
                    {activeTasks} Tasks
                </text>
            </g>
        </svg>
    )
}

export default function Overview() {
    return (
        <div className="flex flex-col lg:flex-row gap-5 items-start">
            {/* ── Left column ── */}
            <div className="flex-1 min-w-0 space-y-5">
                <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-6 py-5">
                    <p className="text-[10px] text-[#9999A8] font-semibold uppercase tracking-widest mb-1">Welcome Back</p>
                    <h2 className="text-xl font-bold text-[#1A1A2E]">Hi, Skylar Dias 👋</h2>
                    <p className="text-xs text-[#9999A8] mt-0.5">Let's finish your task today!</p>
                </div>

                {/* Activity */}
                <div className="rounded-2xl bg-[#F5F5F7] shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-2" style={{ height: "214px" }}>

                    {/* Header */}
                    <div className="flex items-center justify-between" style={{ flexShrink: 0 }}>
                        <p className="text-sm font-semibold text-[#1A1A2E]">Activity</p>
                        <span className="text-[12px] font-medium cursor-pointer px-3 py-1 rounded-lg select-none flex items-center gap-1">
                            This Week
                            <ChevronDown className="w-3.5 h-3.5" />
                        </span>
                    </div>

                    {/* Chart box — day labels bhi andar */}
                    <div className="rounded-xl bg-white flex flex-col pt-3 pb-2 px-2" style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>

                        {/* Chart row: y-axis + sparkline */}
                        <div className="flex gap-1" style={{ flex: 1, minHeight: 0 }}>
                            <div className="flex flex-col justify-between text-[9px] text-[#14152] pr-1 py-0.5" style={{ flexShrink: 0 }}>
                                <span>3</span><span>2</span><span>1</span>
                            </div>
                            <div style={{ flex: 1, minWidth: 0, height: "100%" }}>
                                <SparkLine />
                            </div>
                        </div>

                        {/* Day labels inside white box */}
                        <div className="flex justify-between text-[9px] text-[#141522] pl-5 pr-1 mt-1" style={{ flexShrink: 0 }}>
                            {dayLabels.map((d, i) => <span key={i}>{d}</span>)}
                        </div>

                    </div>
                </div>

                <MonthlyMentors />
                <UpccomingTask />
            </div>

            {/* ── Right sidebar — flex-col so TaskToday can grow with flex-1 ── */}
            <div className="w-full lg:w-[340px] xl:w-[340px] lg:h-[1000px] shrink-0 flex flex-col gap-4 self-stretch">
                <MiniCalendar />
                <TaskToday />
            </div>
        </div>
    )
}