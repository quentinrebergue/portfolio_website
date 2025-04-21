import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-card_background dark:bg-gray-900 shadow-md rounded-2xl p-6 space-y-4 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{project.name}</h2>
      <p className="text-sm text-gray-500">{project.place} · {new Date(project.date).toLocaleDateString("en-GB")}</p>
      
      <div className="flex flex-wrap gap-2 text-xs text-white">
        {project.category.map((cat, i) => (
          <span key={i} className="bg-blue-600 px-2 py-1 rounded-full">{cat}</span>
        ))}
      </div>

      <p className="text-gray-700 dark:text-gray-300 text-sm">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech, i) => (
          <span key={i} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-xs px-2 py-1 rounded">{tech}</span>
        ))}
      </div>

      <p className="text-xs text-gray-500">Group: {project.group}</p>
      <p className="text-xs text-gray-500">Status: {project.state}</p>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm underline"
        >
          View Project
        </a>
      )}
    </div>
  );
};

export default ProjectCard;
