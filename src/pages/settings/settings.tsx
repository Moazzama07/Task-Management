import { useState } from "react"

// ── Types ──────────────────────────────────────────────────────────────────
type Tab = "general" | "notification"

interface NotificationItem {
    id: string
    label: string
    enabled: boolean
}

// ── Sub-components ─────────────────────────────────────────────────────────

/** Reusable select dropdown matching the Figma style */
function SelectField({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#1A1A2E]">{label}</label>
            <div className="relative">
                <select
                    className="w-full appearance-none rounded-xl border border-[#E8E8EF] bg-white px-4 py-3 pr-10 text-sm text-[#1A1A2E] shadow-[0_1px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]/30 cursor-pointer"
                    defaultValue={value}
                >
                    <option>English (Default)</option>
                    <option>Urdu</option>
                    <option>Arabic</option>
                    <option>French</option>
                </select>
                <svg
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9999A8]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    )
}

/** 24h / 12h toggle matching Figma */
function TimeFormatToggle() {
    const [is24h, setIs24h] = useState(true)

    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#1A1A2E]">Timezone</label>
            <div className="flex items-center gap-0 w-fit rounded-xl border border-[#E8E8EF] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
                <button
                    onClick={() => setIs24h(true)}
                    className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${is24h
                            ? "bg-[#4F6EF7] text-white shadow-sm"
                            : "bg-white text-[#9999A8] hover:text-[#1A1A2E]"
                        }`}
                >
                    24 Hours
                </button>
                <button
                    onClick={() => setIs24h(false)}
                    className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${!is24h
                            ? "bg-[#4F6EF7] text-white shadow-sm"
                            : "bg-white text-[#9999A8] hover:text-[#1A1A2E]"
                        }`}
                >
                    12 Hours
                </button>
            </div>
        </div>
    )
}

/** Toggle switch component */
function Toggle({
    enabled,
    onToggle,
}: {
    enabled: boolean
    onToggle: () => void
}) {
    return (
        <button
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${enabled ? "bg-[#4F6EF7]" : "bg-[#E8E8EF]"
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${enabled ? "translate-x-6" : "translate-x-1"
                    }`}
            />
        </button>
    )
}

// ── General Tab ────────────────────────────────────────────────────────────
function GeneralSettings() {
    return (
        <div className="space-y-6">
            <SelectField label="Language" value="English (Default)" />
            <SelectField label="Timezone" value="English (Default)" />
            <TimeFormatToggle />
        </div>
    )
}

// ── Notification Tab ───────────────────────────────────────────────────────
function NotificationSettings() {
    const [items, setItems] = useState<NotificationItem[]>([
        { id: "message", label: "Message", enabled: true },
        { id: "task-update", label: "Task Update", enabled: false },
        { id: "task-deadline", label: "Task Deadline", enabled: true },
        { id: "mentor-help", label: "Mentor Help", enabled: false },
    ])

    const toggle = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, enabled: !item.enabled } : item
            )
        )
    }

    return (
        <div className="space-y-0 divide-y divide-[#F3F3F7]">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between py-4"
                >
                    <span className="text-sm font-medium text-[#1A1A2E]">{item.label}</span>
                    <Toggle enabled={item.enabled} onToggle={() => toggle(item.id)} />
                </div>
            ))}
        </div>
    )
}

// ── Main Settings Component ────────────────────────────────────────────────
export default function Settings() {
    const [activeTab, setActiveTab] = useState<Tab>("general")

    return (
        <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-6 pt-5 pb-6">
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-[#F3F3F7] mb-6">
                {(["general", "notification"] as Tab[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-medium capitalize transition-colors duration-200 border-b-2 -mb-px ${activeTab === tab
                                ? "text-[#4F6EF7] border-[#4F6EF7]"
                                : "text-[#9999A8] border-transparent hover:text-[#1A1A2E]"
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === "general" ? <GeneralSettings /> : <NotificationSettings />}

            {/* Save Button */}
            <div className="mt-8">
                <button className="rounded-xl bg-[#4F6EF7] px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(79,110,247,0.35)] hover:bg-[#3D5CE8] active:scale-95 transition-all duration-150">
                    Save Changes
                </button>
            </div>
        </div>
    )
}