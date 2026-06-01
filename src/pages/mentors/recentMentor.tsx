import { ChevronLeft, ChevronRight } from "lucide-react"

const recentMentors = [
    {
        id: 1,
        name: "Jessica Jane",
        role: "Web Developer",
        tasks: 40,
        rating: 4.7,
        reviews: 750,
        messages: 28,
        followed: false,
        avatar: "JJ",
        color: "bg-purple-400",
    },
    {
        id: 2,
        name: "Abraham Lincoln",
        role: "3D Design",
        tasks: 32,
        rating: 4.9,
        reviews: 510,
        messages: 15,
        followed: true,
        avatar: "AL",
        color: "bg-blue-400",
    },
    {
        id: 3,
        name: "Curious George",
        role: "UI UX Design",
        tasks: 40,
        rating: 4.7,
        reviews: 750,
        messages: 28,
        followed: false,
        avatar: "CG",
        color: "bg-orange-400",
    },
]

export default function RecentMentors() {
    return (
        <div className="mb-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#3C3C46]">Recent Mentors</h2>
                <div className="flex gap-2">
                    <button className="w-7 h-7 rounded-full border border-[#E8E8ED] flex items-center justify-center hover:bg-gray-50">
                        <ChevronLeft className="w-4 h-4 text-[#8B8B9E]" />
                    </button>
                    <button className="w-7 h-7 rounded-full border border-[#E8E8ED] flex items-center justify-center hover:bg-gray-50">
                        <ChevronRight className="w-4 h-4 text-[#8B8B9E]" />
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentMentors.map((mentor) => (
                    <div
                        key={mentor.id}
                        className="bg-white rounded-2xl border border-[#E8E8ED] p-4 flex flex-col gap-3 shadow-sm"
                    >
                        {/* Top row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-10 h-10 rounded-full ${mentor.color} flex items-center justify-center text-white text-sm font-semibold`}
                                >
                                    {mentor.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#3C3C46]">{mentor.name}</p>
                                    <p className="text-xs text-[#8B8B9E]">{mentor.role}</p>
                                </div>
                            </div>
                            {mentor.followed ? (
                                <span className="text-xs text-[#8B8B9E] font-medium">Followed</span>
                            ) : (
                                <button className="text-xs text-[#6C63FF] font-semibold hover:underline">
                                    + Follow
                                </button>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-[#8B8B9E]">
                            <span>📋 {mentor.tasks} Task</span>
                            <span>⭐ {mentor.rating} ({mentor.reviews} Reviews)</span>
                            <span>💬 {mentor.messages}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}