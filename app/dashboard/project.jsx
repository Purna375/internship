"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const [projects, setProjects] = useState([
    { id: 1, name: "AI Assistant", status: "Pending Acceptance" },
    { id: 2, name: "Web App", status: "Accepted & Payment Pending" },
    { id: 3, name: "Blockchain Project", status: "Payment Completed" },
  ]);

  const statusStyles = {
    "Pending Acceptance": "bg-yellow-500",
    "Accepted & Payment Pending": "bg-blue-500",
    "Payment Completed": "bg-green-500",
  };

  const router = useRouter(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/project-details"); 
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Project Dashboard</h1>

      {/* Add Project Button */}
      <button
        onClick={handleSubmit}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add New Project
      </button>

      {/* Project Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h2>

            {/* Status Indicator */}
            <div className="flex items-center mt-2">
              <span
                className={`w-3 h-3 mr-2 rounded-full ${statusStyles[project.status]} animate-pulse`}
              ></span>
              <p className="text-gray-700 dark:text-gray-300">{project.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
