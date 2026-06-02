import { useState } from "react"
import MentorCard from "@/pages/mentors/mentorCard"
import type { Mentor } from "@/pages/mentors/Mentors"

export const ALL_MENTORS: Mentor[] = [
    {
        id: 1,
        name: "Jessica Jane",
        role: "Web Developer",
        bio: "Hi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web.",
        tasks: 40, rating: 4.7, reviews: 750, followed: false,
        avatar: "https://i.pravatar.cc/100?img=11",
        color: "bg-purple-400", category: "Web Developer",
    },
    {
        id: 2,
        name: "Abraham Lincoln",
        role: "3D Design",
        bio: "Hi, I'm Abraham Lincoln. I am a professional 3D designer with over 10 years of experience.",
        tasks: 32, rating: 4.9, reviews: 510, followed: true,
        avatar: "https://i.pravatar.cc/100?img=12",
        color: "bg-blue-400", category: "Frontend",
    },
    {
        id: 3,
        name: "Curious George",
        role: "UI UX Design",
        bio: "Hi, I'm Curious George. I specialize in crafting intuitive user experiences.",
        tasks: 40, rating: 4.7, reviews: 750, followed: false,
        avatar: "https://i.pravatar.cc/100?img=13",
        color: "bg-orange-400", category: "UI/UX Design",
    },
    {
        id: 4,
        name: "Alex Stanton",
        role: "UI / UX Designer",
        bio: "Hi, I'm Alex Stanton. I am a doctoral student at Oxford University majoring in UI / UX Design.",
        tasks: 60, rating: 4.9, reviews: 970, followed: true,
        avatar: "https://i.pravatar.cc/100?img=14",
        color: "bg-blue-500", category: "UI/UX Design",
    },
    {
        id: 5,
        name: "Antoine Griezmann",
        role: "Android Developer",
        bio: "Hi, I'm Antoine Griezmann. I'm an Android Developer at Google company.",
        tasks: 50, rating: 4.8, reviews: 830, followed: false,
        avatar: "https://i.pravatar.cc/100?img=15",
        color: "bg-red-400", category: "Android Dev",
    },
    {
        id: 6,
        name: "Anna White",
        role: "3D Design",
        bio: "Hi, I'm Anna White. I'm a professional 3D Designer at Blender company.",
        tasks: 60, rating: 4.8, reviews: 870, followed: true,
        avatar: "https://i.pravatar.cc/100?img=16",
        color: "bg-green-400", category: "Frontend",
    },
    {
        id: 7,
        name: "Richard Kyle",
        role: "2D Design",
        bio: "Hi, I'm Richard Kyle. I'm a professional 2D Designer at Photoshop company.",
        tasks: 60, rating: 4.7, reviews: 730, followed: false,
        avatar: "https://i.pravatar.cc/100?img=17",
        color: "bg-yellow-500", category: "Frontend",
    },
    {
        id: 8,
        name: "Julia Philips",
        role: "iOS Developer",
        bio: "Hi, I'm Julia Philips. I'm a senior manager at Apple company.",
        tasks: 60, rating: 4.9, reviews: 910, followed: false,
        avatar: "https://i.pravatar.cc/100?img=18",
        color: "bg-pink-400", category: "Backend",
    },
]

export default function AllMentors({ mentors }: { mentors: Mentor[] }) {
    const [mentorList, setMentorList] = useState(mentors)

    const toggleFollow = (id: number) => {
        setMentorList((prev) =>
            prev.map((m) => m.id === id ? { ...m, followed: !m.followed } : m)
        )
    }

    return (
        <section>
            <h2 className="mb-4 text-xl font-semibold text-[#141522]">Mentors</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mentorList.map((mentor) => (
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