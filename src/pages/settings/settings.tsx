import { CheckCircle2, AlertTriangle, X } from "lucide-react"
import { NotificationSettings } from "./Notification"
import { useSettings, Tab, GeneralState } from "./hooks/useSettings"

// Toast
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#1A1A2E] px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.18)] animate-[slideUp_0.3s_ease-out]">
            <CheckCircle2 className="h-4 w-4 text-[#4ADE80] shrink-0" />
            <span className="text-sm font-medium text-white">{message}</span>
            <button onClick={onClose} className="ml-1 text-white/40 hover:text-white transition-colors">
                <X className="h-3.5 w-3.5" />
            </button>
        </div>
    )
}

// Unsaved Warning Banner
function UnsavedBanner({ onDiscard }: { onDiscard: () => void }) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#FFF8EC] border border-[#FDE9A2] px-4 py-3 mb-5">
            <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-4 w-4 text-[#F59E0B] shrink-0" />
                <span className="text-sm font-medium text-[#92600A]">
                    Unsaved changes — save or discard before leaving.
                </span>
            </div>
            <button
                onClick={onDiscard}
                className="text-xs font-semibold text-[#F59E0B] hover:text-[#D97706] transition-colors whitespace-nowrap"
            >
                Discard
            </button>
        </div>
    )
}

// SelectField
function SelectField({
    label,
    value,
    options,
    onChange,
}: {
    label: string
    value: string
    options: string[]
    onChange: (val: string) => void
}) {
    return (
        <div className="space-y-1.5 w-full max-w-sm">
            <label className="block text-sm font-medium text-[#1A1A2E]">{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-[#E8E8EF] bg-white px-4 py-3 pr-10 text-sm text-[#1A1A2E] shadow-[0_1px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]/30 cursor-pointer transition-shadow"
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
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

// TimeFormatToggle
function TimeFormatToggle({
    value,
    onChange,
}: {
    value: "24h" | "12h"
    onChange: (val: "24h" | "12h") => void
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#1A1A2E]">Time Format</label>
            <div className="flex items-center w-fit rounded-xl border border-[#E8E8EF] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
                {(["24h", "12h"] as const).map((fmt) => (
                    <button
                        key={fmt}
                        onClick={() => onChange(fmt)}
                        className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${value === fmt
                            ? "bg-[#4F6EF7] text-white shadow-sm"
                            : "bg-white text-[#9999A8] hover:text-[#1A1A2E]"
                            }`}
                    >
                        {fmt === "24h" ? "24 Hours" : "12 Hours"}
                    </button>
                ))}
            </div>
        </div>
    )
}

// GeneralSettings
function GeneralSettings({
    form,
    onChange,
}: {
    form: GeneralState
    onChange: (patch: Partial<GeneralState>) => void
}) {
    return (
        <div className="space-y-6">
            <SelectField
                label="Language"
                value={form.language}
                options={["English (Default)", "Urdu", "Arabic", "French", "Spanish"]}
                onChange={(v) => onChange({ language: v })}
            />
            <SelectField
                label="Timezone"
                value={form.timezone}
                options={[
                    "Asia/Karachi",
                    "Asia/Dubai",
                    "Asia/Kolkata",
                    "Europe/London",
                    "America/New_York",
                    "America/Los_Angeles",
                    "UTC",
                ]}
                onChange={(v) => onChange({ timezone: v })}
            />
            <TimeFormatToggle
                value={form.timeFormat}
                onChange={(v) => onChange({ timeFormat: v })}
            />
        </div>
    )
}

// Main Settings
export default function Settings() {
    const {
        activeTab,
        draftGeneral,
        draftNotif,
        isDirty,
        isDirtyGeneral,
        isDirtyNotif,
        toast,
        patchGeneral,
        toggleNotif,
        handleDiscard,
        handleSave,
        handleTabSwitch,
        setToast,
    } = useSettings()

    return (
        <>
            <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-6 pt-5 pb-6">

                {/* Unsaved warning banner */}
                {isDirty && <UnsavedBanner onDiscard={handleDiscard} />}

                {/* Tabs */}
                <div className="flex items-center gap-6 border-b border-[#F3F3F7] mb-6">
                    {(["general", "notification"] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabSwitch(tab)}
                            className={`relative pb-3 text-sm font-medium capitalize transition-colors duration-200 border-b-2 -mb-px ${activeTab === tab
                                ? "text-[#4F6EF7] border-[#4F6EF7]"
                                : "text-[#9999A8] border-transparent hover:text-[#1A1A2E]"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            {/* dirty dot indicator on inactive tab */}
                            {tab !== activeTab &&
                                ((tab === "general" && isDirtyGeneral) ||
                                    (tab === "notification" && isDirtyNotif)) && (
                                    <span className="absolute -top-0.5 -right-2 h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                                )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === "general" ? (
                    <GeneralSettings form={draftGeneral} onChange={patchGeneral} />
                ) : (
                    <NotificationSettings items={draftNotif} onToggle={toggleNotif} />
                )}

                {/* Save Button */}
                <div className="mt-8 flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        disabled={!isDirty}
                        className={`rounded-xl px-8 py-3 text-sm font-semibold text-white transition-all duration-150 ${isDirty
                            ? "bg-[#4F6EF7] shadow-[0_4px_14px_rgba(79,110,247,0.35)] hover:bg-[#3D5CE8] active:scale-95"
                            : "bg-[#C5C5D0] cursor-not-allowed"
                            }`}
                    >
                        Save Changes
                    </button>
                    {isDirty && (
                        <button
                            onClick={handleDiscard}
                            className="rounded-xl px-5 py-3 text-sm font-medium text-[#9999A8] hover:text-[#1A1A2E] hover:bg-[#F5F5F7] transition-all duration-150"
                        >
                            Discard
                        </button>
                    )}
                </div>
            </div>

            {/* Toast */}
            {toast && <Toast message={toast} onClose={() => setToast(null)} />}

            {/* Slide-up animation */}
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    )
}