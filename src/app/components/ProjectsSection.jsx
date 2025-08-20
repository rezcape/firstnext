"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

const ProjectsSection = () => {
  // State to store your repositories
  const [repos, setRepos] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch repositories from the GitHub API
    const fetchRepos = async () => {
      try {
        // Replace 'your-github-username' with your actual GitHub username
        const response = await fetch(
          "https://api.github.com/users/rezcape/repos?sort=updated&direction=desc"
        );
        const data = await response.json();
        // We'll take the 6 most recently updated repos
        setRepos(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []); // The empty array ensures this runs only once on component mount

  return (
    <section id="projects" className="text-white">
      <h2 className="text-center text-4xl font-bold mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <p className="text-center text-lg text-[#ADB7BE] mb-12">
        A selection of my latest projects pulled directly from my GitHub.
      </p>

      {loading ? (
        <p className="text-center">Loading projects...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {repos.map((repo) => (
            <div key={repo.id} className="bg-[#181818] rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
              <p className="text-[#ADB7BE] text-sm h-20 overflow-hidden">
                {repo.description || "No description available."}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-400">
                  ⭐ {repo.stargazers_count}
                </span>
                <Link
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-white"
                >
                  <CodeBracketIcon className="h-8 w-8" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
