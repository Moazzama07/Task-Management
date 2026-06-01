import { useState, useMemo } from "react"
import { Search as SearchIcon, ChevronLeft, ChevronRight } from "lucide-react"
import SearchBar from "@/pages/mentors/mentorSearch"

// ── Types ────────────────────────────────────────────────────────────────────

export interface Mentor {
    id: number
    name: string
    role: string
    bio: string
    tasks: number
    rating: number
    reviews: number
    followed: boolean
    avatar: string
    color: string
    category: string
}

// ── Data ─────────────────────────────────────────────────────────────────────

const RECENT_MENTORS: Mentor[] = [
    {
        id: 1,
        name: "Jessica Jane",
        role: "Web Developer",
        bio: "Hi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web ...",
        tasks: 40,
        rating: 4.7,
        reviews: 750,
        followed: false,
        avatar: "JJ",
        color: "bg-purple-400",
        category: "Web Developer",
    },
    {
        id: 2,
        name: "Abraham Lincoln",
        role: "3D Design",
        bio: "Hi, I'm Abraham Lincoln. I am a professional 3D designer with over 10 years of experience ...",
        tasks: 32,
        rating: 4.9,
        reviews: 510,
        followed: true,
        avatar: "AL",
        color: "bg-blue-400",
        category: "Frontend",
    },
    {
        id: 3,
        name: "Curious George",
        role: "UI UX Design",
        bio: "Hi, I'm Curious George. I specialize in crafting intuitive user experiences ...",
        tasks: 40,
        rating: 4.7,
        reviews: 750,
        followed: false,
        avatar: "CG",
        color: "bg-orange-400",
        category: "UI/UX Design",
    },
]

const ALL_MENTORS: Mentor[] = [
    ...RECENT_MENTORS,
    {
        id: 4,
        name: "Alex Stanton",
        role: "UI / UX Designer",
        bio: "Hi, I'm Alex Stanton. I am a doctoral student at Oxford University majoring in UI / UX ...",
        tasks: 60,
        rating: 4.9,
        reviews: 970,
        followed: true,
        avatar: "AS",
        color: "bg-blue-500",
        category: "UI/UX Design",
    },
    {
        id: 5,
        name: "Antoine Griezmann",
        role: "Android Developer",
        bio: "Hi, I'm Antoine Griezmann. I'm an Android Developer at Google company ...",
        tasks: 50,
        rating: 4.8,
        reviews: 830,
        followed: false,
        avatar: "AG",
        color: "bg-red-400",
        category: "Android Dev",
    },
    {
        id: 6,
        name: "Anna White",
        role: "3D Design",
        bio: "Hi, I'm Anna White. I'm a professional 3D Designer at Blender company ...",
        tasks: 60,
        rating: 4.8,
        reviews: 870,
        followed: true,
        avatar: "AW",
        color: "bg-green-400",
        category: "Frontend",
    },
    {
        id: 7,
        name: "Richard Kyle",
        role: "2D Design",
        bio: "Hi, I'm Richard Kyle. I'm a professional 2D Designer at Photoshop company ...",
        tasks: 60,
        rating: 4.7,
        reviews: 730,
        followed: false,
        avatar: "RK",
        color: "bg-yellow-500",
        category: "Frontend",
    },
    {
        id: 8,
        name: "Julia Philips",
        role: "iOS Developer",
        bio: "Hi, I'm Julia Philips. I'm a senior manager at Apple company ...",
        tasks: 60,
        rating: 4.9,
        reviews: 910,
        followed: false,
        avatar: "JP",
        color: "bg-pink-400",
        category: "Backend",
    },
]

// ── MentorCard ────────────────────────────────────────────────────────────────

function MentorCard({ mentor }: { mentor: Mentor }) {
    return (
        <article className="group flex flex-col gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className={`h-10 w-10 rounded-full ${mentor.color} flex items-center justify-center text-sm font-semibold text-white`}
                    >
                        {mentor.avatar}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[#141522]">{mentor.name}</p>
                        <p className="text-xs text-[#8E92BC]">{mentor.role}</p>
                    </div>
                </div>
                {mentor.followed ? (
                    <span className="text-xs font-medium text-[#8E92BC]">Followed</span>
                ) : (
                    <button className="text-xs font-semibold text-[#546FFF] hover:underline">
                        + Follow
                    </button>
                )}
            </div>

            {/* Bio */}
            <p className="line-clamp-2 text-xs leading-relaxed text-[#8E92BC]">{mentor.bio}</p>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-[#54577A]">
                <span>📋 {mentor.tasks} Task</span>
                <span>
                    ⭐ {mentor.rating}{" "}
                    <span className="text-[#8E92BC]">({mentor.reviews} Reviews)</span>
                </span>
            </div>
        </article>
    )
}

// ── RecentMentors ─────────────────────────────────────────────────────────────

function RecentMentors({ mentors }: { mentors: Mentor[] }) {
    return (
        <section>
            {/* Section Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#141522]">Recent Mentors</h2>
                <div className="flex gap-2">
                    <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E9EDFF] bg-white hover:bg-[#F5F6FF] transition-colors">
                        <ChevronLeft className="h-4 w-4 text-[#8E92BC]" />
                    </button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E9EDFF] bg-white hover:bg-[#F5F6FF] transition-colors">
                        <ChevronRight className="h-4 w-4 text-[#8E92BC]" />
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                ))}
            </div>
        </section>
    )
}

// ── AllMentors ────────────────────────────────────────────────────────────────

function AllMentors({ mentors }: { mentors: Mentor[] }) {
    return (
        <section>
            <h2 className="mb-4 text-xl font-semibold text-[#141522]">Mentors</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                ))}
            </div>
        </section>
    )
}

// ── Main Mentors Page ─────────────────────────────────────────────────────────

export default function Mentors() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedSort, setSelectedSort] = useState("Deadline")

    const filteredMentors = useMemo(() => {
        let mentors = ALL_MENTORS

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            mentors = mentors.filter(
                (m) =>
                    m.name.toLowerCase().includes(q) ||
                    m.role.toLowerCase().includes(q) ||
                    m.bio.toLowerCase().includes(q)
            )
        }

        if (selectedCategory !== "All") {
            mentors = mentors.filter((m) => m.category === selectedCategory)
        }

        if (selectedSort === "Progress") {
            mentors = [...mentors].sort((a, b) => b.rating - a.rating)
        } else if (selectedSort === "Title") {
            mentors = [...mentors].sort((a, b) => a.name.localeCompare(b.name))
        } else if (selectedSort === "Category") {
            mentors = [...mentors].sort((a, b) => a.category.localeCompare(b.category))
        } else {
            // Deadline → most tasks first
            mentors = [...mentors].sort((a, b) => b.tasks - a.tasks)
        }

        return mentors
    }, [searchQuery, selectedCategory, selectedSort])

    const isFiltering = searchQuery.trim() !== "" || selectedCategory !== "All"

    return (
        <div className="space-y-8">

            {/* ── Search Bar ── */}
            <SearchBar
                onSearch={setSearchQuery}
                onCategoryChange={setSelectedCategory}
                onSortChange={setSelectedSort}
                selectedCategory={selectedCategory}
                selectedSort={selectedSort}
            />

            {/* ── Empty State ── */}
            {filteredMentors.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#8E92BC]/40 bg-white py-16 text-center">
                    <SearchIcon className="mb-3 h-10 w-10 text-[#8E92BC]/50" />
                    <p className="text-base font-semibold text-[#54577A]">No mentors found</p>
                    <p className="mt-1 text-sm text-[#8E92BC]">Try adjusting your search or filters</p>
                </div>
            )}

            {/* ── Default View (no filter) ── */}
            {!isFiltering && filteredMentors.length > 0 && (
                <>
                    <RecentMentors mentors={RECENT_MENTORS} />
                    <AllMentors mentors={ALL_MENTORS} />
                </>
            )}

            {/* ── Filtered Results ── */}
            {isFiltering && filteredMentors.length > 0 && (
                <section>
                    <h2 className="mb-5 text-xl font-semibold text-[#141522]">
                        Results ({filteredMentors.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredMentors.map((mentor) => (
                            <MentorCard key={mentor.id} mentor={mentor} />
                        ))}
                    </div>
                </section>
            )}

        </div>
    )
}