// Types
export interface NotificationItem {
    id: string
    label: string
    enabled: boolean
}

// Defaults
export const NOTIFICATION_DEFAULTS: NotificationItem[] = [
    { id: "message", label: "Message", enabled: true },
    { id: "task-update", label: "Task Update", enabled: false },
    { id: "task-deadline", label: "Task Deadline", enabled: true },
    { id: "mentor-help", label: "Mentor Help", enabled: false },
]

// Toggle
function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
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

// NotificationSettings
export function NotificationSettings({
    items,
    onToggle,
}: {
    items: NotificationItem[]
    onToggle: (id: string) => void
}) {
    return (
        <div>
            {items.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-start gap-4 py-4"
                >
                    <Toggle
                        enabled={item.enabled}
                        onToggle={() => onToggle(item.id)}
                    />
                    <span className="text-sm font-medium text-[#1A1A2E]">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    )
}