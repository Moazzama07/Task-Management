import type { ReactNode } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboardLayout"
import Overview from "@/pages/Overview"
import Index from "@/pages/Index"

// ── simple wrapper for placeholder pages ──────────────────────────────────────
function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-[#E8E8ED] bg-white p-6 text-[#3C3C46] shadow-sm">
      {children}
    </div>
  )
}

// ── router ────────────────────────────────────────────────────────────────────
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default → /overview */}
        <Route path="/" element={<Navigate to="/overview" replace />} />

        {/* ── Overview: Greeting + Running Task + Activity ── */}
        <Route
          path="/overview"
          element={
            <DashboardLayout title="Overview">
              <Overview />
            </DashboardLayout>
          }
        />

        {/* ── Dashboard home: Mentors + Upcoming + Calendar + Task Today ── */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout title="Dashboard">
              <Index />
            </DashboardLayout>
          }
        />

        {/* ── Task ── */}
        <Route
          path="/task"
          element={
            <DashboardLayout title="Explore Task">
              <PageWrapper>
                Manage and explore your tasks from this dashboard view.
              </PageWrapper>
            </DashboardLayout>
          }
        />

        {/* ── Mentors ── */}
        <Route
          path="/mentors"
          element={
            <DashboardLayout title="Mentors">
              <PageWrapper>
                Connect with mentors and review guidance resources here.
              </PageWrapper>
            </DashboardLayout>
          }
        />

        {/* ── Message ── */}
        <Route
          path="/message"
          element={
            <DashboardLayout title="Message">
              <PageWrapper>
                View your messages and notifications in one place.
              </PageWrapper>
            </DashboardLayout>
          }
        />

        {/* ── Settings ── */}
        <Route
          path="/settings"
          element={
            <DashboardLayout title="Settings">
              <PageWrapper>
                Update your preferences and account settings here.
              </PageWrapper>
            </DashboardLayout>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </BrowserRouter>
  )
}