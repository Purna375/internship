"use client";

import { useState } from "react";

export default function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description,
      file,
    });
    alert("Issue reported successfully!");
  };

  return (
    <div className="w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Report an Issue
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Issue Title */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium">
            Issue Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            placeholder="Enter issue title"
            required
          />
        </div>

        {/* Issue Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium">
            Issue Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            rows="4"
            placeholder="Describe the issue"
            required
          />
        </div>

        {/* File Upload (Optional) */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium">
            Upload Screenshot (Optional)
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white transition-colors"
        >
          Submit Issue
        </button>
      </form>
    </div>
  );
}
