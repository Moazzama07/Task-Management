"use client"

import { NavLink } from "react-router-dom"
import {
    LayoutGrid,
    BookOpen,
    Users,
    MessageSquare,
    Settings,
    HelpCircle,
    X,
} from "lucide-react"

const navItems = [
    { title: "Overview", icon: LayoutGrid, href: "/overview" },
    { title: "Task", icon: BookOpen, href: "/task" },
    { title: "Mentors", icon: Users, href: "/mentors" },
    { title: "Message", icon: MessageSquare, href: "/message" },
    { title: "Settings", icon: Settings, href: "/settings" },
]

interface SidebarProps {
    mobileOpen: boolean
    onClose: () => void
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/30 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
          fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-white border-r border-gray-100
          transition-transform duration-200 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:z-auto md:flex
        `}
            >
                {/* Logo */}
                <div className="flex items-center justify-between px-5 py-5">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg ">
                            <img src="/book-square.svg" alt="Logo" />
                        </div>
                        <span className="text-[16px] font-semibold text-[#1A1A2E]">Nuegas</span>
                    </div>
                    <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-3 py-2 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.title}
                            to={item.href}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${isActive
                                    ? "bg-[#F0EEFF] text-[#1A1A2E]"
                                    : "text-[#9B9BAF] hover:bg-[#F7F7FB] hover:text-[#1A1A2E]"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon
                                        className={`h-[18px] w-[18px] shrink-0 ${isActive ? "text-[#1A1A2E]" : "text-[#B8B8CC]"
                                            }`}
                                    />
                                    <span>{item.title}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Help Center */}
                <div className="flex justify-center pb-5">
                    <div className="relative flex h-[240px] w-[200px] flex-col items-center justify-between rounded-2xl bg-[#141522] p-5 text-white">

                        <div className="absolute -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1f2233] shadow-lg z-10">
                            <HelpCircle className="h-6 w-6 text-white" />
                        </div>

                        {/* Top Section */}
                        <div className="flex flex-col items-center text-center pt-4">
                            <p className="mt-6 text-[14px] font-semibold leading-tight">
                                Help Center
                            </p>

                            <p className="mt-3 text-[12px] leading-snug text-white/80">
                                Having Trouble in Learning. Please contact us for more questions.
                            </p>
                        </div>

                        {/* Button */}
                        <button className="w-full rounded-xl bg-white py-2.5 text-[11px] font-medium text-black transition-colors">
                            Go To Help Center
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}