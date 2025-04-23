import React from "react";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects.json"; // Place your JSON file in `/data`

const Projects = () => {
  return (
    <main className="min-h-screen px-2 lg:max-w-5xl md:max-w-2xl sm:max-w-2xl max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">My Projects</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
        {projects.map((proj, i) => (
          <ProjectCard key={i} project={proj} />
        ))}
      </div>
    </main>
  );
};

export default Projects;
