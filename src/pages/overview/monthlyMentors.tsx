import { useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const MENTORS_DATA = [
    { id: 1, name: "Curious George", role: "UI/UX Design", tasks: 40, rating: 4.7, reviews: 750, avatar: "https://i.pravatar.cc/48?img=11", following: false },
    { id: 2, name: "Abraham Lincoln", role: "3D Design", tasks: 32, rating: 4.9, reviews: 510, avatar: "https://i.pravatar.cc/48?img=52", following: true },
]

export default function MonthlyMentors() {
    const [mentors, setMentors] = useState(MENTORS_DATA)
    const toggleFollow = (id: number) =>
        setMentors((prev) => prev.map((m) => (m.id === id ? { ...m, following: !m.following } : m)))

    return (
        <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-[#1A1A2E]">Monthly Mentors</p>
                <div className="flex gap-1">
                    {[ChevronLeft, ChevronRight].map((Icon, i) => (
                        <button key={i} className="w-7 h-7 rounded-full bg-[#F5F5F8] flex items-center justify-center text-[#9999A8] hover:bg-[#EDEDF2] transition-colors">
                            <Icon className="h-3 w-3" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mentors.map((m) => (
                    <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFAFA] hover:bg-[#F5F5FB] transition-colors">
                        <Avatar className="h-10 w-10 shrink-0">
                            <AvatarImage src={m.avatar} alt={m.name} />
                            <AvatarFallback>{m.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#1A1A2E] truncate">{m.name}</p>
                            <p className="text-[11px] text-[#9999A8]">{m.role}</p>
                            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#9999A8]">
                                <span>{m.tasks} Task</span>
                                <span className="flex items-center gap-0.5 text-amber-400">
                                    <Star className="h-2.5 w-2.5" fill="currentColor" />{m.rating}
                                </span>
                                <span className="text-[#C5C5D0]">({m.reviews})</span>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleFollow(m.id)}
                            className={`text-[11px] font-semibold px-3 py-1 rounded-full shrink-0 transition-colors
                ${m.following
                                    ? "text-[#4F6EF7] bg-[#EEF1FE]"
                                    : "text-white bg-[#4F6EF7] hover:bg-[#3A57E8]"
                                }`}
                        >
                            {m.following ? "Followed" : "+ Follow"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}