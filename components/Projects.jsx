import React from "react";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects.json"; // Place your JSON file in `/data`

const Projects = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 sm:px-8 md:px-12 lg:px-24">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, i) => (
          <ProjectCard key={i} project={proj} />
        ))}
      </div>
    </main>
  );
};

export default Projects;
