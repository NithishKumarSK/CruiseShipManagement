import React, { useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import VoyagerDashboard from "./VoyagerDashboard";
import GuestDashboard from "./GuestDashboard";
import HeadCookDashboard from './HeadCookDashboard';
import SupervisorDashboard from "./SupervisorDashboard";
import ManagerDashboard from "./ManagerDashboard";

function Dashboard() {
  const { currentUser, loading: authLoading } = useAuth(); // Handle loading state for auth
  const nav = useNavigate();

  useEffect(() => {
    // Redirect to sign-in page if no user is logged in
    if (!authLoading && !currentUser) {
      nav("/users/signin");
    }
  }, [authLoading, currentUser, nav]);

  // Show a loading screen while `currentUser` is being fetched
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  // Render the appropriate dashboard based on the user's role
  if (currentUser) {
    switch (currentUser.role) {
      case "Admin":
        return <AdminDashboard />;
      case "Voyager":
        return <VoyagerDashboard />;
      case "HeadCook":
        return <HeadCookDashboard />;
      case "Supervisor":
        return <SupervisorDashboard />;
      case "Manager":
        return <ManagerDashboard />;
      case "Guest":
      default:
        return <GuestDashboard />;
    }
  }

  // If no user is logged in, return `null` (this won't be displayed because of the redirection in `useEffect`)
  return null;
}

export default Dashboard;
