import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Briefcase } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mentorsData = [
    {
        id: 1,
        name: "Curious George",
        role: "UI/UX Design",
        tasks: 40,
        rating: 4.7,
        reviews: 750,
        avatar: "https://i.pravatar.cc/100?img=11",
        following: false,
    },
    {
        id: 2,
        name: "Abraham Lincoln",
        role: "3D Design",
        tasks: 32,
        rating: 4.9,
        reviews: 510,
        avatar: "https://i.pravatar.cc/100?img=52",
        following: true,
    },
    {
        id: 3,
        name: "Robert Fox",
        role: "Web Developer",
        tasks: 25,
        rating: 4.8,
        reviews: 420,
        avatar: "https://i.pravatar.cc/100?img=33",
        following: false,
    },
    {
        id: 4,
        name: "Jenny Wilson",
        role: "Product Designer",
        tasks: 18,
        rating: 4.6,
        reviews: 310,
        avatar: "https://i.pravatar.cc/100?img=44",
        following: false,
    },
]

export default function MonthlyMentors() {
    const [mentors, setMentors] = useState(mentorsData)
    const [startIndex, setStartIndex] = useState(0)

    const [visibleCount, setVisibleCount] = useState(2)

    useEffect(() => {
        const updateVisibleCount = () => {
            setVisibleCount(window.innerWidth < 1280 ? 1 : 2)
        }

        updateVisibleCount()

        window.addEventListener("resize", updateVisibleCount)

        return () =>
            window.removeEventListener("resize", updateVisibleCount)
    }, [])

    useEffect(() => {
        setStartIndex(0)
    }, [visibleCount])

    const visibleMentors = mentors.slice(
        startIndex,
        startIndex + visibleCount
    )

    const toggleFollow = (id: number) => {
        setMentors((prev) =>
            prev.map((m) =>
                m.id === id
                    ? { ...m, following: !m.following }
                    : m
            )
        )
    }

    const handleNext = () => {
        if (startIndex + visibleCount >= mentors.length) {
            setStartIndex(0)
        } else {
            setStartIndex((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        if (startIndex === 0) {
            setStartIndex(mentors.length - visibleCount)
        } else {
            setStartIndex((prev) => prev - 1)
        }
    }

    return (
        <section className="space-y-5">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#141522]">
                    Monthly Mentors
                </h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrev}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#F5F5F7]"
                    >
                        <ChevronLeft className="h-6 w-6 text-[#141522]" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#F5F5F7]"
                    >
                        <ChevronRight className="h-5 w-5 text-[#141522]" />
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
                {visibleMentors.map((mentor) => (
                    <div
                        key={mentor.id}
                        className="rounded-2xl bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                    >
                        {/* Left */}
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            <Avatar className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0">
                                <AvatarImage
                                    src={mentor.avatar}
                                    alt={mentor.name}
                                />

                                <AvatarFallback className="bg-[#EEF2FF] text-[#546FFF] font-semibold">
                                    {mentor.name[0]}
                                </AvatarFallback>
                            </Avatar>

                            <div className="min-w-0">
                                <h3 className="truncate text-sm sm:text-base lg:text-[16px] font-semibold text-[#141522]">
                                    {mentor.name}
                                </h3>

                                <p className="text-xs sm:text-sm text-[#9C9CA4]">
                                    {mentor.role}
                                </p>

                                <div className="mt-2 flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm">
                                    <div className="flex items-center gap-1 text-[#54577A]">
                                        <Briefcase className="h-4 w-4" />
                                        {mentor.tasks} Task
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-[#FFB648] text-[#FFB648]" />

                                        <span className="text-[#141522]">
                                            {mentor.rating}
                                        </span>

                                        <span className="text-[#8E92BC]">
                                            ({mentor.reviews})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Follow Button */}
                        <button
                            onClick={() =>
                                toggleFollow(mentor.id)
                            }
                            className={`w-full sm:w-auto rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer
                            
                            ${mentor.following
                                    ? "bg-[#EEF2FF] text-[#54577A]"
                                    : "text-[#546FFF] bg-transparent border border-[#546FFF]/20"
                                }`}
                        >
                            {mentor.following
                                ? "Followed"
                                : "+ Follow"}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}