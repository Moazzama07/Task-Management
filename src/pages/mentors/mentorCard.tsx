import type { Mentor } from "@/pages/mentors/Mentors"
import { Star, Briefcase } from "lucide-react"

interface MentorCardProps {
    mentor: Mentor
    onToggleFollow?: (id: number) => void
}

export default function MentorCard({ mentor, onToggleFollow }: MentorCardProps) {
    return (
        <article className="group flex flex-col gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {mentor.avatar.startsWith("http") ? (
                        <img
                            src={mentor.avatar}
                            alt={mentor.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className={`h-10 w-10 rounded-full ${mentor.color} flex items-center justify-center text-sm font-semibold text-white shrink-0`}>
                            {mentor.avatar}
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-semibold text-[#141522]">{mentor.name}</p>
                        <p className="text-xs text-[#8E92BC]">{mentor.role}</p>
                    </div>
                </div>

                <button
                    onClick={() => onToggleFollow?.(mentor.id)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200 cursor-pointer
                        ${mentor.followed
                            ? "bg-[#EEF2FF] text-[#54577A]"
                            : "text-[#546FFF]"
                        }`}
                >
                    {mentor.followed ? "Followed" : "+ Follow"}
                </button>
            </div>

            <p className="line-clamp-2 text-xs leading-relaxed text-[#8E92BC]">{mentor.bio}</p>

            <div className="flex w-full items-center justify-between text-xs text-[#54577A]">
                {/* Left Side: Tasks */}
                <div className="flex items-center gap-1 text-[#141522]">
                    <Briefcase className="h-3.5 w-3.5" />
                    {mentor.tasks} Task
                </div>

                {/* Right Side: Rating & Reviews */}
                <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#FFB648] text-[#FFB648]" />
                    <span className="text-[#141522]">{mentor.rating}</span>
                    <span className="text-[#141522]">({mentor.reviews} Reviews)</span>
                </div>
            </div>
        </article>
    )
}