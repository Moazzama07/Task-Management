import { useState } from "react"
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react"

const CATEGORIES = ["All", "UI/UX Design", "Web Developer", "Frontend", "Android Dev", "Backend"]
const SORT_OPTIONS = ["Deadline", "Progress", "Title", "Category"]

interface SearchBarProps {
    onSearch: (query: string) => void
    onCategoryChange: (category: string) => void
    onSortChange: (sort: string) => void
    selectedCategory: string
    selectedSort: string
}

export default function SearchBar({
    onSearch,
    onCategoryChange,
    onSortChange,
    selectedCategory,
    selectedSort,
}: SearchBarProps) {
    const [query, setQuery] = useState("")
    const [showCategories, setShowCategories] = useState(false)
    const [showSort, setShowSort] = useState(false)

    const handleSearch = (value: string) => {
        setQuery(value)
        onSearch(value)
    }

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8E92BC]" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search Task"
                    className="w-full rounded-xl border border-[#E9EDFF] bg-white py-2.5 pl-10 pr-4 text-sm text-[#141522] placeholder:text-[#8E92BC] outline-none focus:border-[#546FFF] focus:ring-2 focus:ring-[#546FFF]/10 transition-all"
                />
            </div>

            {/* Category Dropdown */}
            <div className="relative">
                <button
                    onClick={() => {
                        setShowCategories((p) => !p)
                        setShowSort(false)
                    }}
                    className="flex items-center gap-2 rounded-xl border border-[#E9EDFF] bg-white px-4 py-2.5 text-sm font-medium text-[#54577A] hover:border-[#546FFF] transition-all whitespace-nowrap"
                >
                    <SlidersHorizontal className="h-4 w-4 text-[#546FFF]" />
                    Category
                    <ChevronDown className={`h-4 w-4 transition-transform ${showCategories ? "rotate-180" : ""}`} />
                </button>

                {showCategories && (
                    <div className="absolute top-full left-0 z-20 mt-2 w-44 rounded-2xl border border-[#E9EDFF] bg-white shadow-lg shadow-black/5 overflow-hidden">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    onCategoryChange(cat)
                                    setShowCategories(false)
                                }}
                                className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#F5F6FF] ${selectedCategory === cat
                                        ? "bg-[#F0F3FF] text-[#546FFF] font-semibold"
                                        : "text-[#54577A]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
                <button
                    onClick={() => {
                        setShowSort((p) => !p)
                        setShowCategories(false)
                    }}
                    className="flex items-center gap-2 rounded-xl border border-[#E9EDFF] bg-white px-4 py-2.5 text-sm font-medium text-[#54577A] hover:border-[#546FFF] transition-all whitespace-nowrap"
                >
                    <span className="text-[#8E92BC] text-xs">Sort By</span>
                    {selectedSort}
                    <ChevronDown className={`h-4 w-4 transition-transform ${showSort ? "rotate-180" : ""}`} />
                </button>

                {showSort && (
                    <div className="absolute top-full right-0 z-20 mt-2 w-36 rounded-2xl border border-[#E9EDFF] bg-white shadow-lg shadow-black/5 overflow-hidden">
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => {
                                    onSortChange(opt)
                                    setShowSort(false)
                                }}
                                className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#F5F6FF] ${selectedSort === opt
                                        ? "bg-[#F0F3FF] text-[#546FFF] font-semibold"
                                        : "text-[#54577A]"
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}