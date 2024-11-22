'use client'
import Sidebar from "../../../components/sideBar";
import ProjectCard from "../../../components/ProjectCard";
import ProjectMetrics from "../../../components/projectMetrices";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A sleek and modern portfolio to showcase your skills.",
    technologies: ["React", "Tailwind CSS", "Next.js"],
    status: "Completed",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "A scalable e-commerce app with secure payment integration.",
    technologies: ["Node.js", "MongoDB", "Express"],
    status: "In Progress",
  },
  {
    id: 3,
    title: "Social Media App",
    description: "Feature-rich social media app for connecting people.",
    technologies: ["React Native", "Firebase", "Redux"],
    status: "Completed",
  },
];

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="p-6 space-y-6">
          {/* Metrics Section */}
          <ProjectMetrics />
          {/* Projects Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">My Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;
