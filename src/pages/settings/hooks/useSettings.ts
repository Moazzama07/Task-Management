import { useState, useCallback } from "react"
import { NotificationItem, NOTIFICATION_DEFAULTS } from "../Notification"

export type Tab = "general" | "notification"

export interface GeneralState {
    language: string
    timezone: string
    timeFormat: "24h" | "12h"
}

export const GENERAL_DEFAULTS: GeneralState = {
    language: "English (Default)",
    timezone: "Asia/Karachi",
    timeFormat: "24h",
}

function generalChanged(a: GeneralState, b: GeneralState) {
    return a.language !== b.language || a.timezone !== b.timezone || a.timeFormat !== b.timeFormat
}

function notifChanged(a: NotificationItem[], b: NotificationItem[]) {
    return a.some((item, i) => item.enabled !== b[i].enabled)
}

export function useSettings() {
    const [activeTab, setActiveTab] = useState<Tab>("general")

    const [savedGeneral, setSavedGeneral] = useState<GeneralState>(GENERAL_DEFAULTS)
    const [savedNotif, setSavedNotif] = useState<NotificationItem[]>(NOTIFICATION_DEFAULTS)

    const [draftGeneral, setDraftGeneral] = useState<GeneralState>(GENERAL_DEFAULTS)
    const [draftNotif, setDraftNotif] = useState<NotificationItem[]>(NOTIFICATION_DEFAULTS)

    const [toast, setToast] = useState<string | null>(null)

    const isDirtyGeneral = generalChanged(draftGeneral, savedGeneral)
    const isDirtyNotif = notifChanged(draftNotif, savedNotif)
    const isDirty = activeTab === "general" ? isDirtyGeneral : isDirtyNotif

    const patchGeneral = useCallback((patch: Partial<GeneralState>) => {
        setDraftGeneral((prev) => ({ ...prev, ...patch }))
    }, [])

    const toggleNotif = useCallback((id: string) => {
        setDraftNotif((prev) =>
            prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
        )
    }, [])

    const handleDiscard = () => {
        if (activeTab === "general") setDraftGeneral(savedGeneral)
        else setDraftNotif(savedNotif)
    }

    const handleSave = () => {
        if (activeTab === "general") setSavedGeneral(draftGeneral)
        else setSavedNotif(draftNotif)
        setToast("Settings saved successfully!")
    }

    const handleTabSwitch = (tab: Tab) => setActiveTab(tab)

    return {
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
    }
}