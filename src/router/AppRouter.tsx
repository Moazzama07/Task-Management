import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboardLayout"

// pages
import Overview from "@/pages/overview/index"
import Task from "@/pages/task/Task"
import Mentors from "@/pages/mentors/Mentors"
import Messages from "@/pages/messages/index"
import Settings from "@/pages/settings/index"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />

        <Route
          path="/overview"
          element={
            <DashboardLayout title="Overview">
              <Overview />
            </DashboardLayout>
          }
        />

        <Route
          path="/task"
          element={
            <DashboardLayout title="Explore Task">
              <Task />
            </DashboardLayout>
          }
        />

        <Route
          path="/mentors"
          element={
            <DashboardLayout title="Mentors">
              <Mentors />
            </DashboardLayout>
          }
        />

        <Route
          path="/message"
          element={
            <DashboardLayout title="Message">
              <Messages />
            </DashboardLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <DashboardLayout title="Settings">
              <Settings />
            </DashboardLayout>
          }
        />

        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </BrowserRouter>
  )
}