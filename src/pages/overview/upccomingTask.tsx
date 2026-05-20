import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UPCOMING_DATA = [
    {
        id: 1, title: "Creating Mobile App Design", category: "UI/UX Design", progress: 75, daysLeft: 3,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&q=80",
        avatars: ["https://i.pravatar.cc/24?img=1", "https://i.pravatar.cc/24?img=2", "https://i.pravatar.cc/24?img=3"],
    },
    {
        id: 2, title: "Creating Perfect Website", category: "Web Developer", progress: 85, daysLeft: 4,
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&q=80",
        avatars: ["https://i.pravatar.cc/24?img=4", "https://i.pravatar.cc/24?img=5", "https://i.pravatar.cc/24?img=6"],
    },
]

export default function UpccomingTask() {
    return (
        <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-[#1A1A2E]">Upcoming Task</p>
                <div className="flex gap-1">
                    {[ChevronLeft, ChevronRight].map((Icon, i) => (
                        <button key={i} className="w-7 h-7 rounded-full bg-[#F5F5F8] flex items-center justify-center text-[#9999A8] hover:bg-[#EDEDF2] transition-colors">
                            <Icon className="h-3 w-3" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {UPCOMING_DATA.map((t) => (
                    <div key={t.id} className="rounded-xl overflow-hidden bg-[#FAFAFA] hover:shadow-md transition-shadow">
                        <img src={t.image} alt={t.title} className="w-full h-28 object-cover" />
                        <div className="p-3 space-y-1.5">
                            <p className="text-[11px] text-[#4F6EF7] font-semibold">{t.category}</p>
                            <p className="text-sm font-semibold text-[#1A1A2E] leading-snug">{t.title}</p>
                            <div className="flex items-center justify-between text-xs text-[#9999A8]">
                                <span>Progress</span>
                                <span className="text-[#4F6EF7] font-semibold">{t.progress}%</span>
                            </div>
                            {/* Custom progress bar — Figma style */}
                            <div className="w-full bg-[#EEF1FE] rounded-full h-1.5">
                                <div className="bg-[#4F6EF7] h-1.5 rounded-full transition-all" style={{ width: `${t.progress}%` }} />
                            </div>
                            <div className="flex items-center justify-between pt-0.5">
                                <div className="flex items-center gap-1 text-xs text-[#9999A8]">
                                    <Clock className="h-3 w-3" />
                                    <span>{t.daysLeft} Days Left</span>
                                </div>
                                <div className="flex -space-x-1.5">
                                    {t.avatars.map((a, i) => (
                                        <Avatar key={i} className="h-5 w-5 border-2 border-white">
                                            <AvatarImage src={a} />
                                            <AvatarFallback className="text-[8px]">{i + 1}</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}