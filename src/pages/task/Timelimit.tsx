import { useState } from "react"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Task {
    id: number
    title: string
    category: string
    progress: number
    timeLeft: string
    image: string
    avatars: string[]
}

interface TimeLimitProps {
    tasks: Task[]
}

const CARDS_VISIBLE = 2

export default function TimeLimit({ tasks }: TimeLimitProps) {
    const [startIndex, setStartIndex] = useState(0)

    const canPrev = startIndex > 0
    const canNext = startIndex < tasks.length - CARDS_VISIBLE

    const visibleTasks = tasks.slice(startIndex, startIndex + CARDS_VISIBLE)

    return (
        <section>
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#141522]">Time Limit</h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => canPrev && setStartIndex((p) => p - 1)}
                        disabled={!canPrev}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E9EDFF] bg-white transition-all hover:bg-[#F5F6FF] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft className="h-5 w-5 text-[#141522]" />
                    </button>

                    <button
                        onClick={() => canNext && setStartIndex((p) => p + 1)}
                        disabled={!canNext}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E9EDFF] bg-white transition-all hover:bg-[#F5F6FF] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronRight className="h-5 w-5 text-[#141522]" />
                    </button>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {visibleTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </section>
    )
}

function TaskCard({ task }: { task: Task }) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            {/* Image */}
            <div className="h-[160px] w-full overflow-hidden">
                <img
                    src={task.image}
                    alt={task.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Body */}
            <div className="space-y-4 p-4">
                {/* Title */}
                <div className="space-y-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8E92BC]">
                        {task.category}
                    </p>
                    <h3 className="text-[15px] font-semibold leading-snug text-[#141522]">
                        {task.title}
                    </h3>
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#54577A]">Progress</span>
                        <span className="text-xs font-semibold text-[#546FFF]">{task.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#E9EDFF]">
                        <div
                            className="h-full rounded-full bg-[#546FFF] transition-all duration-700"
                            style={{ width: `${task.progress}%` }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#54577A]">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{task.timeLeft}</span>
                    </div>

                    <div className="flex -space-x-2">
                        {task.avatars.slice(0, 4).map((avatar, i) => (
                            <Avatar key={i} className="h-7 w-7 border-2 border-white">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="text-[9px] bg-[#E9EDFF] text-[#546FFF]">
                                    {i + 1}
                                </AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    )
}