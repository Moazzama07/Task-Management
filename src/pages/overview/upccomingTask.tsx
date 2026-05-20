import { useState } from "react"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import image1 from "@/assets/Image (1).svg"
import image2 from "@/assets/Image (2).svg"

const upcomingTasks = [
    {
        id: 1,
        title: "Creating Mobile App Design",
        category: "UI/UX Design",
        progress: 75,
        daysLeft: 3,
        image: image1,
        avatars: [
            "https://i.pravatar.cc/40?img=1",
            "https://i.pravatar.cc/40?img=2",
            "https://i.pravatar.cc/40?img=3",
        ],
    },
    {
        id: 2,
        title: "Creating Perfect Website",
        category: "Web Developer",
        progress: 85,
        daysLeft: 4,
        image: image2,
        avatars: [
            "https://i.pravatar.cc/40?img=4",
            "https://i.pravatar.cc/40?img=5",
            "https://i.pravatar.cc/40?img=6",
        ],
    },
    {
        id: 3,
        title: "Dashboard UI Development",
        category: "Frontend",
        progress: 60,
        daysLeft: 5,
        image: image1,
        avatars: [
            "https://i.pravatar.cc/40?img=7",
            "https://i.pravatar.cc/40?img=8",
        ],
    },
]

export default function UpcomingTask() {
    const [startIndex, setStartIndex] = useState(0)

    const visibleCards = upcomingTasks.slice(startIndex, startIndex + 2)

    const handleNext = () => {
        if (startIndex < upcomingTasks.length - 2) {
            setStartIndex((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex((prev) => prev - 1)
        }
    }

    return (
        <section className="rounded-3xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#141522]">
                    Upcoming Task
                </h2>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePrev}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#F5F5F7] disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={startIndex === 0}
                    >
                        <ChevronLeft className="h-6 w-6 text-[#141522]" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#F5F5F7] disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={startIndex >= upcomingTasks.length - 2}
                    >
                        <ChevronRight className="h-5 w-5 text-[#141522]" />
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {visibleCards.map((task) => (
                    <article
                        key={task.id}
                        className="overflow-hidden rounded-3xl border border-black/5 bg-[#FAFAFC] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                        {/* Image */}
                        <div className="h-[170px] w-full overflow-hidden">
                            <img
                                src={task.image}
                                alt={task.title}
                                loading="lazy"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="space-y-5 p-5">
                            {/* Title */}
                            <div className="space-y-1">
                                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8E92BC]">
                                    {task.category}
                                </p>

                                <h3 className="text-lg font-semibold leading-snug text-[#141522]">
                                    {task.title}
                                </h3>
                            </div>

                            {/* Progress */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-[#54577A]">
                                        Progress
                                    </span>

                                    <span className="text-sm font-semibold text-[#546FFF]">
                                        {task.progress}%
                                    </span>
                                </div>

                                <div className="h-2 w-full rounded-full bg-[#E9EDFF]">
                                    <div
                                        className="h-full rounded-full bg-[#546FFF] transition-all duration-500"
                                        style={{ width: `${task.progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm font-medium text-[#54577A]">
                                    <Clock className="h-4 w-4" />
                                    <span>{task.daysLeft} Days Left</span>
                                </div>

                                <div className="flex -space-x-2">
                                    {task.avatars.map((avatar, index) => (
                                        <Avatar
                                            key={index}
                                            className="h-8 w-8 border-2 border-white"
                                        >
                                            <AvatarImage src={avatar} />
                                            <AvatarFallback className="text-[10px]">
                                                {index + 1}
                                            </AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}