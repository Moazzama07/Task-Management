"use client"

import { Bell, Menu } from "lucide-react"

interface HeaderProps {
    title?: string
    onMenuClick: () => void
}

export function Header({ title = "Explore Task", onMenuClick }: HeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-5 md:px-6">

            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <h1 className="text-[18px] font-semibold text-[#1A1A2E] tracking-tight">
                    {title}
                </h1>
            </div>

            <div className="flex items-center gap-3">
                <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 hover:bg-[#EFEFFF] transition-colors">
                    <Bell className="h-[18px] w-[18px] text-[#9B9BAF]" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#FF4D4F]">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4D4F] opacity-60" />
                    </span>
                </button>

                <button className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#5B4FCF]/20 hover:ring-[#5B4FCF]/50 transition-all">
                    <img
                        src="https://i.pravatar.cc/36?img=47"
                        alt="User avatar"
                        className="h-full w-full object-cover"
                    />
                </button>
            </div>
        </header>
    )
}