import React from "react";
import Icons from "@/components/Icons"


const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 aspect-square flex flex-col">
      {/* Icon */}
      <div className="flex justify-center mb-2">
          <Icons category={project.category[0]}/>
      </div>

      {/* Title (minimum height) */}
      <h2 className="text-md text-center font-semibold text-gray-800 mb-1 flex-shrink-0">
        {project.name}
      </h2>

      {/* Description takes all remaining vertical space */}
      <div className="flex-grow min-h-0 overflow-hidden">
        <p className="text-gray-700 dark:text-gray-400 text-xs md:text-sm h-full">
          {project.description}
        </p>
      </div>

      {/* Tags (minimum height) */}
      <div className="flex flex-wrap gap-2 mt-2 justify-center flex-shrink-0">
        {project.stack.map((tech, i) => (
          <span
            key={i}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-xs px-2 py-1 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

  );
};

export default ProjectCard;

