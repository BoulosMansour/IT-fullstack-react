import { ProjectCard } from "./Components/ProjectCard";
import NewProjectModal from "./Components/NewProjectModal";
import { useState } from "react";
import { type Project, Priority, Status } from "./types/types";

const Dashboard = () => {
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            title: "Project 1",
            description: "Description for Project 1",
            priority: Priority.High,
            status: Status.NotStarted
        },
        {
            id: 2,
            title: "Project 2",
            description: "Description for Project 2",
            priority: Priority.Medium,
            status: Status.InProgress
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const completedCount = projects.filter(p => p.status === Status.Completed).length;

    return (
        <div className="w-full px-6 py-6">
            <div className="flex items-center justify-center gap-20 mb-6">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed projects: <span className="font-medium text-indigo-600 dark:text-indigo-400">{completedCount}</span></p>
                    <div className="mt-4">
                        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500">Add Project</button>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
                {projects.map(project => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        priority={project.priority}
                        status={project.status}
                        setProjects={setProjects}
                    />
                ))}
            </div>

            <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setProjects={setProjects} />
        </div>
    );
}

export default Dashboard;