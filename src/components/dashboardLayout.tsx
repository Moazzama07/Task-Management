"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"

interface DashboardLayoutProps {
    children: React.ReactNode
    title?: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <div className="flex h-screen overflow-hidden bg-[#FAFAFA]">
            {/* Sidebar */}
            <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header
                    title={title}
                    onMenuClick={() => setMobileOpen(true)}
                />
                <main className="flex-1 overflow-auto px-5 py-6 md:px-6 md:py-8">
                    {children}
                </main>
            </div>
        </div>
    )
}