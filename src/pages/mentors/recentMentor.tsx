import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MentorCard from "@/pages/mentors/mentorCard"
import type { Mentor } from "@/pages/mentors/Mentors"

const RECENT_MENTORS: Mentor[] = [
    {
        id: 1,
        name: "Jessica Jane",
        role: "Web Developer",
        bio: "",
        tasks: 40, rating: 4.7, reviews: 750, followed: false,
        avatar: "https://i.pravatar.cc/100?img=11",
        color: "bg-purple-400", category: "Web Developer",
    },
    {
        id: 2,
        name: "Abraham Lincoln",
        role: "3D Design",
        bio: "",
        tasks: 32, rating: 4.9, reviews: 510, followed: true,
        avatar: "https://i.pravatar.cc/100?img=12",
        color: "bg-blue-400", category: "Frontend",
    },
    {
        id: 3,
        name: "Curious George",
        role: "UI UX Design",
        bio: "",
        tasks: 40, rating: 4.7, reviews: 750, followed: false,
        avatar: "https://i.pravatar.cc/100?img=13",
        color: "bg-orange-400", category: "UI/UX Design",
    },
    {
        id: 4,
        name: "Alex Stanton",
        role: "UI / UX Designer",
        bio: "",
        tasks: 60, rating: 4.9, reviews: 970, followed: true,
        avatar: "https://i.pravatar.cc/100?img=14",
        color: "bg-blue-500", category: "UI/UX Design",
    },
    {
        id: 5,
        name: "Anna White",
        role: "3D Design",
        bio: "",
        tasks: 60, rating: 4.8, reviews: 870, followed: false,
        avatar: "https://i.pravatar.cc/100?img=15",
        color: "bg-green-400", category: "Frontend",
    },
    {
        id: 6,
        name: "Julia Philips",
        role: "iOS Developer",
        bio: "",
        tasks: 60, rating: 4.9, reviews: 910, followed: false,
        avatar: "https://i.pravatar.cc/100?img=16",
        color: "bg-pink-400", category: "Backend",
    },
]

export default function RecentMentors() {
    const [mentors, setMentors] = useState(RECENT_MENTORS)
    const [startIndex, setStartIndex] = useState(0)
    const [visibleCount, setVisibleCount] = useState(3)

    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 640) setVisibleCount(1)
            else if (window.innerWidth < 1024) setVisibleCount(2)
            else setVisibleCount(3)
        }

        updateVisibleCount()
        window.addEventListener("resize", updateVisibleCount)
        return () => window.removeEventListener("resize", updateVisibleCount)
    }, [])

    useEffect(() => {
        setStartIndex(0)
    }, [visibleCount])

    const toggleFollow = (id: number) => {
        setMentors((prev) =>
            prev.map((m) => m.id === id ? { ...m, followed: !m.followed } : m)
        )
    }

    const visibleMentors = mentors.slice(startIndex, startIndex + visibleCount)

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
        <section>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#141522]">Recent Mentors</h2>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleMentors.map((mentor) => (
                    <MentorCard
                        key={mentor.id}
                        mentor={mentor}
                        onToggleFollow={toggleFollow}
                    />
                ))}
            </div>
        </section>
    )
}