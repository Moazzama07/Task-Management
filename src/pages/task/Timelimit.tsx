import { useRef, useState } from "react"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type Task } from "./Newtask"

// TaskCard 

function TaskCard({ task }: { task: Task }) {
    return (
        <article className="group flex-shrink-0 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="h-[150px] w-full overflow-hidden">
                <img
                    src={task.image}
                    alt={task.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="space-y-3 p-4">
                <div className="space-y-0.5">
                    <h3 className="text-lg font-semibold leading-snug text-[#141522]">
                        {task.title}
                    </h3>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#54577A]">
                        {task.category}
                    </p>
                </div>
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
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#54577A]">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{task.timeLeft}</span>
                    </div>
                    <div className="flex -space-x-2">
                        {task.avatars.slice(0, 4).map((avatar, i) => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-white">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="text-[8px] bg-[#E9EDFF] text-[#546FFF]">
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

// HorizontalCarousel 

export function HorizontalCarousel({ title, tasks }: { title: string; tasks: Task[] }) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(tasks.length > 3)

    const updateArrows = () => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 4)
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    }

    const scroll = (dir: "left" | "right") => {
        const el = scrollRef.current
        if (!el) return
        const amount =
            window.innerWidth < 640
                ? el.clientWidth
                : window.innerWidth < 1024
                    ? el.clientWidth / 2
                    : el.clientWidth / 3
        el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
    }

    if (tasks.length === 0) return null

    return (
        <section>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[24px] font-semibold text-[#141522]">{title}</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#F5F5F7] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft className="h-6 w-6 text-[#141522]" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#F5F5F7] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronRight className="h-6 w-6 text-[#141522]" />
                    </button>
                </div>
            </div>
            <div className="overflow-hidden">
                <div
                    ref={scrollRef}
                    onScroll={updateArrows}
                    className="flex gap-4 overflow-x-auto scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="min-w-full sm:min-w-[calc((100%-16px)/2)] lg:min-w-[calc((100%-32px)/3)]"
                        >
                            <TaskCard task={task} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}