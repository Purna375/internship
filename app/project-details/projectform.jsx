"use client";

import { useState, useEffect } from "react";
import Terms from "./Terms";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // For App Router (Next.js 13+)

function generateProjectId(company = "HT") {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const projectNumber = "001";

  return `${company}${date}${month}${year}${projectNumber}`;
}

export default function ProjectDetails() {
  const [projectId, setProjectId] = useState("");
  const [domain, setDomain] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [file, setFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setProjectId(generateProjectId());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("projectId", projectId);
    formData.append("domain", domain);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("deliveryDate", deliveryDate);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.status === 201) {
        alert(data.message || "Project created successfully!");
        router.push("/dashboard/projects"); // Redirect to desired page
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting the project.");
    }
  };

  return (
    <div className="sm:max-w-2xl md:max-w-3xl lg:w-3xl mx-auto p-6 sm:p-6 bg-white dark:bg-gray-900 shadow-lg rounded-md transition-colors duration-300 border dark:border-gray-700 border-gray-300">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
        PROJECT DETAILS
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project ID */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Project ID
          </label>
          <input
            type="text"
            value={projectId}
            readOnly
            className="w-full p-2 border bg-gray-100 dark:bg-gray-800 dark:text-white rounded"
          />
        </div>

        {/* Domain */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Project Domain
          </label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-2 border bg-gray-100 dark:bg-gray-800 dark:text-white rounded"
            required
          >
            <option value="">Select Domain</option>
            <option value="AI">Artificial Intelligence</option>
            <option value="Web">Web Development</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Project Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border bg-gray-100 dark:bg-gray-800 dark:text-white rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Project Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border bg-gray-100 dark:bg-gray-800 dark:text-white rounded"
            rows="4"
            required
          />
        </div>

        {/* File */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Upload Documents (Optional)
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 border bg-gray-100 dark:bg-gray-800 dark:text-white rounded"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Delivery Date
          </label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full p-2 border bg-gray-100 dark:bg-gray-800 dark:text-white rounded"
            required
          />
        </div>

        {/* Submit */}
        <Dialog>
          <DialogTrigger asChild>
            <Button type="submit" className="flex justify-center items-center ">Submit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:text-white">
            <Terms />
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
}
