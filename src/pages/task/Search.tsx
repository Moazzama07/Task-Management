import { useState, useRef, useEffect } from "react"
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

    const categoryRef = useRef<HTMLDivElement>(null)
    const sortRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
                setShowCategories(false)
            }
            if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
                setShowSort(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSearch = (value: string) => {
        setQuery(value)
        onSearch(value)
    }

    return (
        <div className="flex items-center gap-3 w-full ">

            {/* ── Search Input*/}
            <div className="relative w-80 sm:w-96">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search Task"
                    className="
                        w-full rounded-2xl border border-[#E9EDFF] bg-white
                        py-3 pl-4 pr-10
                        text-sm text-[#141522] placeholder:text-[#8E92BC]
                        outline-none
                        focus:border-[#54577A] focus:ring-2 focus:ring-[#54577A]/10
                        transition-all duration-200
                    "
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8E92BC] pointer-events-none" />
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-2 shrink-0">

                {/* ── Category Dropdown ── */}
                <div className="relative" ref={categoryRef}>
                    <button
                        onClick={() => {
                            setShowCategories((p) => !p)
                            setShowSort(false)
                        }}
                        className="
                            flex items-center gap-2
                            rounded-2xl border border-[#E9EDFF] bg-white
                            px-3 sm:px-4 py-3
                            text-sm font-medium text-[#54577A]
                            hover:border-[#54577A] hover:bg-[#F5F6FF]
                            transition-all duration-200
                            whitespace-nowrap
                        "
                    >
                        <SlidersHorizontal className="h-4 w-4 text-[#546FFF]" />
                        <span className="hidden sm:inline">Category</span>
                        <ChevronDown
                            className={`hidden sm:block h-4 w-4 text-[#8E92BC] transition-transform duration-200 ${showCategories ? "rotate-180" : ""}`}
                        />
                    </button>

                    {showCategories && (
                        <div className="
                            absolute top-full right-0 z-30 mt-2
                            w-48 rounded-2xl
                            border border-[#E9EDFF] bg-white
                            shadow-xl shadow-black/8
                            overflow-hidden
                        ">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        onCategoryChange(cat)
                                        setShowCategories(false)
                                    }}
                                    className={`
                                        w-full px-4 py-2.5 text-left text-sm
                                        transition-colors duration-150
                                        hover:bg-[#F5F6FF]
                                        ${selectedCategory === cat
                                            ? "bg-[#EEF1FF] text-[#546FFF] font-semibold"
                                            : "text-[#54577A]"
                                        }
                                    `}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative hidden sm:block" ref={sortRef}>
                    <button
                        onClick={() => {
                            setShowSort((p) => !p)
                            setShowCategories(false)
                        }}
                        className="
                            flex items-center gap-2
                            rounded-2xl border border-[#E9EDFF] bg-white
                            px-4 py-3
                            text-sm font-medium text-[#54577A]
                            hover:border-[#54577A] hover:bg-[#F5F6FF]
                            transition-all duration-200
                            whitespace-nowrap
                        "
                    >
                        <span className="text-[#8E92BC] text-xs font-normal">Sort By</span>
                        <span className="font-semibold text-[#141522]">{selectedSort}</span>
                        <ChevronDown
                            className={`h-4 w-4 text-[#8E92BC] transition-transform duration-200 ${showSort ? "rotate-180" : ""}`}
                        />
                    </button>

                    {showSort && (
                        <div className="
                            absolute top-full right-0 z-30 mt-2
                            w-40 rounded-2xl
                            border border-[#E9EDFF] bg-white
                            shadow-xl shadow-black/8
                            overflow-hidden
                        ">
                            {SORT_OPTIONS.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => {
                                        onSortChange(opt)
                                        setShowSort(false)
                                    }}
                                    className={`
                                        w-full px-4 py-2.5 text-left text-sm
                                        transition-colors duration-150
                                        hover:bg-[#F5F6FF]
                                        ${selectedSort === opt
                                            ? "bg-[#EEF1FF] text-[#546FFF] font-semibold"
                                            : "text-[#54577A]"
                                        }
                                    `}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}