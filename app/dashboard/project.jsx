"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pencil } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  const [projects, setProjects] = useState([
    { id: 1, name: "AI Assistant", domain: "Artificial Intelligence", status: "Pending Acceptance" },
    { id: 2, name: "Web App", domain: "Full Stack", status: "Accepted & Payment Pending" },
    { id: 3, name: "Blockchain Project", domain: "Blockchain", status: "Payment Completed" },
    { id: 4, name: "Ml Project", domain: "AIML", status: "Rejected" },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [newDomain, setNewDomain] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/project-details");
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setNewDomain(project.domain);
  };

  const handleDomainChange = (value) => {
    setNewDomain(value);
  };

  const handleSave = () => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id ? { ...p, domain: newDomain } : p
      )
    );
    setSelectedProject(null);
  };

  const statusStyles = {
    "Pending Acceptance": "bg-yellow-500",
    "Accepted & Payment Pending": "bg-blue-500",
    "Payment Completed": "bg-green-500",
    "Rejected": "bg-red-500",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Project Dashboard</h1>

      <button
        onClick={handleSubmit}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add New Project
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {project.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Domain: {project.domain}
            </p>
            <div className="flex items-center mb-1">
              <span
                className={`w-3 h-3 mr-2 rounded-full ${statusStyles[project.status]} animate-pulse`}
              ></span>
              <p className="text-gray-700 dark:text-gray-300">{project.status}</p>
            </div>

            {/* Edit Icon */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  onClick={() => handleEditClick(project)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
                >
                  <Pencil size={18} />
                </button>
              </AlertDialogTrigger>
              {selectedProject?.id === project.id && (
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Edit Domain</AlertDialogTitle>
                    <AlertDialogDescription>
                      You can update the domain for <strong>{selectedProject.name}</strong>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <div className="mt-4 space-y-2">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Project Name:</strong> {selectedProject.name}
                    </div>

                    <Select value={newDomain} onValueChange={handleDomainChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                        <SelectItem value="Web Development">Web Development</SelectItem>
                        <SelectItem value="Blockchain">Blockchain</SelectItem>
                        <SelectItem value="Full Stack">Full Stack</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  );
}
