import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import image1 from "@/assets/Image (1).svg"
import image2 from "@/assets/Image (2).svg"

const UPCOMING_DATA = [
    {
        id: 1,
        title: "Creating Mobile App Design",
        category: "UI/UX Design",
        progress: 75,
        daysLeft: 3,
        image: image1,
        avatars: [
            "https://i.pravatar.cc/40?img=1",
            "https://i.pravatar.cc/40?img=2",
            "https://i.pravatar.cc/40?img=3",
        ],
    },
    {
        id: 2,
        title: "Creating Perfect Website",
        category: "Web Developer",
        progress: 85,
        daysLeft: 4,
        image: image2,
        avatars: [
            "https://i.pravatar.cc/40?img=4",
            "https://i.pravatar.cc/40?img=5",
            "https://i.pravatar.cc/40?img=6",
        ],
    },
]

export default function UpcomingTask() {
    return (
        <section className="rounded-3xl p-5">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[24px] font-semibold text-[#1A1A2E]">
                    Upcoming Task
                </h2>

                <div className="flex items-center gap-4"> {/* Figma ke mutabiq gap thora zyada hai */}
                    {[ChevronLeft, ChevronRight].map((Icon, index) => (
                        <button
                            key={index}
                            className="flex items-center justify-center text-[#141522] transition-colors hover:text-[#8E92BC]"
                        >

                            <Icon className="h-7 w-7 stroke-[2]" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 ">
                {UPCOMING_DATA.map((task) => (
                    <div
                        key={task.id}
                        className="overflow-hidden rounded-2xl bg-[#FAFAFC] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        {/* Image */}
                        <div className="h-[140px] w-full overflow-hidden ">
                            <img
                                src={task.image}
                                alt={task.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="space-y-3 p-4">

                            {/* Title */}
                            <h3 className="text-[16px] font-semibold leading-snug text-[#141522]">
                                {task.title}
                            </h3>
                            {/* Category */}
                            <span className="text-[12px] font-medium uppercase tracking-wide text-[#54577A]">
                                {task.category}
                            </span>

                            {/* Progress */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-[16px] font-medium">
                                    <span className="text-[#141522]">Progress</span>
                                    <span className="font-semibold text-[#546FFF]">
                                        {task.progress}%
                                    </span>
                                </div>

                                <div className="h-2 w-full rounded-full bg-[#E9EDFF]">
                                    <div
                                        className="h-2 rounded-full bg-[#546FFF] transition-all duration-500"
                                        style={{ width: `${task.progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-1">
                                {/* Days Left */}
                                <div className="flex items-center gap-2 text-[16px] text-[#141522]">
                                    <Clock className="h-5 w-5" />
                                    <span>{task.daysLeft} Days Left</span>
                                </div>

                                {/* Avatars */}
                                <div className="flex -space-x-2">
                                    {task.avatars.map((avatar, index) => (
                                        <Avatar
                                            key={index}
                                            className="h-7 w-7 border-2 border-white"
                                        >
                                            <AvatarImage src={avatar} />
                                            <AvatarFallback className="text-[10px]">
                                                {index + 1}
                                            </AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}