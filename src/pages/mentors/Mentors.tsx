import { useState, useMemo } from "react"
import { Search as SearchIcon } from "lucide-react"
import SearchBar from "@/pages/mentors/mentorSearch"
import RecentMentors from "@/pages/mentors/recentMentor"
import AllMentors, { ALL_MENTORS } from "@/pages/mentors/allMentors"
import MentorCard from "@/pages/mentors/mentorCard"

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
    avatarUrl?: string
    color: string
    category: string
}

export default function Mentors() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedSort, setSelectedSort] = useState("Deadline")

    const filteredMentors = useMemo(() => {
        let mentors = ALL_MENTORS

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            mentors = mentors.filter(m =>
                m.name.toLowerCase().includes(q) ||
                m.role.toLowerCase().includes(q) ||
                m.bio.toLowerCase().includes(q)
            )
        }

        if (selectedCategory !== "All")
            mentors = mentors.filter(m => m.category === selectedCategory)

        if (selectedSort === "Progress")
            mentors = [...mentors].sort((a, b) => b.rating - a.rating)
        else if (selectedSort === "Title")
            mentors = [...mentors].sort((a, b) => a.name.localeCompare(b.name))
        else if (selectedSort === "Category")
            mentors = [...mentors].sort((a, b) => a.category.localeCompare(b.category))
        else
            mentors = [...mentors].sort((a, b) => b.tasks - a.tasks)

        return mentors
    }, [searchQuery, selectedCategory, selectedSort])

    const isFiltering = searchQuery.trim() !== "" || selectedCategory !== "All"

    return (
        <div className="space-y-8">

            <SearchBar
                onSearch={setSearchQuery}
                onCategoryChange={setSelectedCategory}
                onSortChange={setSelectedSort}
                selectedCategory={selectedCategory}
                selectedSort={selectedSort}
            />

            {filteredMentors.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#8E92BC]/40 bg-white py-16 text-center">
                    <SearchIcon className="mb-3 h-10 w-10 text-[#8E92BC]/50" />
                    <p className="text-base font-semibold text-[#54577A]">No mentors found</p>
                    <p className="mt-1 text-sm text-[#8E92BC]">Try adjusting your search or filters</p>
                </div>
            )}

            {!isFiltering && filteredMentors.length > 0 && (
                <>
                    <RecentMentors />
                    <AllMentors mentors={ALL_MENTORS} />
                </>
            )}

            {isFiltering && filteredMentors.length > 0 && (
                <section>
                    <h2 className="mb-5 text-xl font-semibold text-[#141522]">
                        Results ({filteredMentors.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredMentors.map(mentor => (
                            <MentorCard key={mentor.id} mentor={mentor} />
                        ))}
                    </div>
                </section>
            )}

        </div>
    )
}