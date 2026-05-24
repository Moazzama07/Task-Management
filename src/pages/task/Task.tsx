import { useState, useMemo, useRef } from "react"
import { Clock, ChevronLeft, ChevronRight, Search as SearchIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SearchBar from "@/pages/task/Search"
import { NEW_TASKS, type Task } from "./Newtask"

// ─── Constants ────────────────────────────────────────────────────────────────

const TIME_LIMIT_TASKS: Task[] = [
    {
        id: 1,
        title: "Creating Awesome Mobile Apps",
        category: "UI/UX Design",
        progress: 90,
        timeLeft: "1 Hour",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
        avatars: ["https://i.pravatar.cc/40?img=1", "https://i.pravatar.cc/40?img=2", "https://i.pravatar.cc/40?img=3", "https://i.pravatar.cc/40?img=4"],
    },
    {
        id: 2,
        title: "Creating Fresh Website",
        category: "Web Developer",
        progress: 85,
        timeLeft: "2 Hours",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=200&fit=crop",
        avatars: ["https://i.pravatar.cc/40?img=5", "https://i.pravatar.cc/40?img=6", "https://i.pravatar.cc/40?img=7"],
    },
    {
        id: 3,
        title: "Creating Color Palletes",
        category: "UI/UX Design",
        progress: 100,
        timeLeft: "1 Hour",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
        avatars: ["https://i.pravatar.cc/40?img=8", "https://i.pravatar.cc/40?img=9", "https://i.pravatar.cc/40?img=10"],
    },
    {
        id: 4,
        title: "Awesome Brand Identity",
        category: "Web Developer",
        progress: 72,
        timeLeft: "3 Hours",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=200&fit=crop",
        avatars: ["https://i.pravatar.cc/40?img=11", "https://i.pravatar.cc/40?img=12"],
    },
    {
        id: 5,
        title: "Redesign Landing Page",
        category: "UI/UX Design",
        progress: 55,
        timeLeft: "3 Hours",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
        avatars: ["https://i.pravatar.cc/40?img=20", "https://i.pravatar.cc/40?img=21"],
    },
]

const ALL_TASKS = [...TIME_LIMIT_TASKS, ...NEW_TASKS]

// ─── TaskCard ─────────────────────────────────────────────────────────────────

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
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8E92BC]">
                        {task.category}
                    </p>
                    <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug text-[#141522]">
                        {task.title}
                    </h3>
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

// ─── HorizontalCarousel ───────────────────────────────────────────────────────

function HorizontalCarousel({ title, tasks }: { title: string; tasks: Task[] }) {
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
        const amount = el.clientWidth / 3
        el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
    }

    if (tasks.length === 0) return null

    return (
        <section>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#141522]">{title}</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E9EDFF] bg-white transition-all hover:bg-[#F5F6FF] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft className="h-5 w-5 text-[#141522]" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E9EDFF] bg-white transition-all hover:bg-[#F5F6FF] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronRight className="h-5 w-5 text-[#141522]" />
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

// ─── Main Task Page ───────────────────────────────────────────────────────────

export default function Task() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedSort, setSelectedSort] = useState("Deadline")

    const filteredTasks = useMemo(() => {
        let tasks = ALL_TASKS

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            tasks = tasks.filter(
                (t) =>
                    t.title.toLowerCase().includes(q) ||
                    t.category.toLowerCase().includes(q)
            )
        }

        if (selectedCategory !== "All") {
            tasks = tasks.filter((t) => t.category === selectedCategory)
        }

        if (selectedSort === "Progress") {
            tasks = [...tasks].sort((a, b) => b.progress - a.progress)
        } else if (selectedSort === "Title") {
            tasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title))
        } else if (selectedSort === "Category") {
            tasks = [...tasks].sort((a, b) => a.category.localeCompare(b.category))
        }

        return tasks
    }, [searchQuery, selectedCategory, selectedSort])

    const isFiltering = searchQuery.trim() !== "" || selectedCategory !== "All"
    const timeLimitTasks = filteredTasks.filter((t) => t.timeLeft.toLowerCase().includes("hour"))
    const newTasks = filteredTasks.filter((t) => !t.timeLeft.toLowerCase().includes("hour"))

    return (
        <div className="space-y-8">
            {/* Search Bar — Figma style */}
            <SearchBar
                onSearch={setSearchQuery}
                onCategoryChange={setSelectedCategory}
                onSortChange={setSelectedSort}
                selectedCategory={selectedCategory}
                selectedSort={selectedSort}
            />

            {/* No results */}
            {filteredTasks.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#8E92BC]/40 bg-white py-16 text-center">
                    <SearchIcon className="mb-3 h-10 w-10 text-[#8E92BC]/50" />
                    <p className="text-base font-semibold text-[#54577A]">No tasks found</p>
                    <p className="mt-1 text-sm text-[#8E92BC]">Try adjusting your search or filters</p>
                </div>
            )}

            {/* Default: horizontal carousels */}
            {!isFiltering && (
                <>
                    {timeLimitTasks.length > 0 && (
                        <HorizontalCarousel title="Time Limit" tasks={timeLimitTasks} />
                    )}
                    {newTasks.length > 0 && (
                        <HorizontalCarousel title="New Task" tasks={newTasks} />
                    )}
                </>
            )}

            {/* Filtered flat grid */}
            {isFiltering && filteredTasks.length > 0 && (
                <section>
                    <h2 className="mb-5 text-xl font-semibold text-[#141522]">
                        Results ({filteredTasks.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}