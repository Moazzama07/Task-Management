import type { ReactNode } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboardLayout"

// ── Overview sub-pages (split components) ────────────────────────────────────
import Overview from "@/pages/overview/index"
import Task from "@/pages/task/Task"

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

        {/* ── Overview: Greeting + Running Task + Activity + Mentors + Upcoming + Sidebar ── */}
        <Route
          path="/overview"
          element={
            <DashboardLayout title="Overview">
              <Overview />
            </DashboardLayout>
          }
        />

        {/* ── Task ── */}
        <Route
          path="/task"
          element={
            <DashboardLayout title="Explore Task">
              <Task />
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