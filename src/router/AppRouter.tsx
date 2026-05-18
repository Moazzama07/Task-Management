import type { ReactNode } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboardLayout"

function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-[#E8E8ED] bg-white p-6 text-[#3C3C46] shadow-sm">
      {children}
    </div>
  )
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/overview " replace />} />

        <Route
          path="/overview"
          element={
            <DashboardLayout title="Overview">
              <PageWrapper>Welcome to the overview page. Here you can see summary statistics and quick actions.</PageWrapper>
            </DashboardLayout>
          }
        />
        <Route
          path="/task"
          element={
            <DashboardLayout title="Explore Task">
              <PageWrapper>Manage and explore your tasks from this dashboard view.</PageWrapper>
            </DashboardLayout>
          }
        />
        <Route
          path="/mentors"
          element={
            <DashboardLayout title="Mentors">
              <PageWrapper>Connect with mentors and review guidance resources here.</PageWrapper>
            </DashboardLayout>
          }
        />
        <Route
          path="/message"
          element={
            <DashboardLayout title="Message">
              <PageWrapper>View your messages and notifications in one place.</PageWrapper>
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout title="Settings">
              <PageWrapper>Update your preferences and account settings here.</PageWrapper>
            </DashboardLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}