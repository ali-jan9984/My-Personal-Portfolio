import React from "react";

const ProjectCard = ({ project }) => {
  const { title, description, technologies, image, demoLink, githubLink } = project;

  return (
    <div className="bg-white text-gray-800 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2">
      <img
        src={image}
        alt={title}
        className="rounded-t-lg h-48 w-full object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-yellow-400 text-gray-900 text-sm px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-medium"
            >
              Live Demo
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:underline font-medium"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
