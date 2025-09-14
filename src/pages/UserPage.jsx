import React, { useState, useEffect } from "react";
import { useAuth } from "../components/Auth_context";
import Avatar from "../components/Avatar";

function UserDashboard() {
  // Get the user's profile from context
  const { profile, loading: authLoading, error: authError } = useAuth();
  // Local loading state
  const [loading, setLoading] = useState(true);
  // Local error state
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading) {
      if (authError) {
        setError(authError);
      }
      setLoading(false);
    }
  }, [authLoading, authError]);
  function editProfile() {
    console.log("editing");
  }
  // Show loading state
  if (loading) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Loading...</h2>
        <p className="text-gray-600">
          Please wait while we load your dashboard.
        </p>
      </div>
    );
  }

  // If there's an error, show it
  if (error) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  // If no profile data
  if (!profile) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          No Profile Data
        </h2>
        <p className="text-gray-600">Please log in to view your dashboard.</p>
      </div>
    );
  }

  // Show the user dashboard
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full border text-center">
      <h2 className="text-2xl font-bold mb-6 text-green-600">Your Dashboard</h2>

      <div className="flex flex-col items-center mb-6">
        <Avatar name={profile.email} size="large" />
        <h3 className="text-xl font-semibold mt-4">Welcome!</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">
            Account Information
          </h4>
          <p>
            <span className="font-medium">Email:</span> {profile.email}
          </p>
          <p>
            <span className="font-medium">User ID:</span> {profile.id}
          </p>
          <p>
            <span className="font-medium">Status:</span>
            <span
              className={`ml-2 px-2 py-1 rounded text-xs ${
                profile.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {profile.is_active ? "Active" : "Inactive"}
            </span>
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Contact Details</h4>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {profile.phone || "Not provided"}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {profile.address || "Not provided"}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Account Dates</h4>
          <p>
            <span className="font-medium">Created:</span>{" "}
            {new Date(profile.created_at).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Last Updated:</span>{" "}
            {new Date(profile.updated_at).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 mb-2">Quick Actions</h4>
          <button
            onClick={editProfile()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm mr-2"
          >
            Edit Profile
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
