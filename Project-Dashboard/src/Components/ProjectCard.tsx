import React, { useState } from 'react';
import { type PriorityType, type ProjectCardProps, type StatusType, PriorityOptions, StatusOptions } from '../types/types';
import SelectList from './SelectList';
import EditProjectModal from './EditProjectModal';

export const ProjectCard: React.FC<ProjectCardProps> = ({
    id,
    title,
    description,
    priority,
    status,
    setProjects
    }) => {

    const handleSelectPriority = (p: PriorityType) => {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.id === id ? { ...project, priority: p } : project
            )
        );
    }

    const handleCycleStatus = () => {
        setProjects(prevProjects =>
            prevProjects.map(project => {
                if (project.id !== id) return project;
                const currentIndex = StatusOptions.indexOf(project.status as any);
                const nextIndex = (currentIndex + 1) % StatusOptions.length;
                return { ...project, status: StatusOptions[nextIndex] as StatusType };
            })
        );
    }

    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleDelete = () => {
        setProjects(prev => prev.filter(p => p.id !== id));
    }

    const priorityAccent = () => {
        if (priority === PriorityOptions[2]) { // High
            return 'border-l-4 border-red-400 bg-red-50/40 dark:bg-red-900/20 hover:bg-red-50/100 dark:hover:bg-red-900/30';
        }
        if (priority === PriorityOptions[1]) { // Medium
            return 'border-l-4 border-yellow-400 bg-yellow-50/40 dark:bg-yellow-900/20 hover:bg-yellow-50/100 dark:hover:bg-yellow-900/30';
        }
        // Low or default
        return 'border-l-4 border-green-400 bg-green-50/40 dark:bg-green-900/20 hover:bg-green-50/100 dark:hover:bg-green-900/30';
    }

    const statusIcon = () => {
        const base = 'w-6 h-6 flex-shrink-0';
        // StatusOptions order: NotStarted, InProgress, Completed
        if (status === StatusOptions[2]) {
            // Completed - green check
            return (
                <svg className={`${base}`} viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="6" className="text-green-500 fill-current/100" />
                </svg>
            );
        }
        if (status === StatusOptions[1]) {
            // In progress - yellow spinner-like dot
            return (
                <svg className={`${base} text-yellow-500`} viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="6" strokeWidth="1.6" className="text-yellow-500 fill-current/100" />
                </svg>
            );
        }
        // Not started - neutral dot
        return (
            <svg className={`${base} text-gray-400`} viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        );
    }

    const statusColors = () => {
        if (status === StatusOptions[2]) return 'text-green-500 bg-green-100 dark:bg-green-700 hover:bg-green-200 dark:hover:bg-green-600';
        if (status === StatusOptions[1]) return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-700 hover:bg-yellow-200 dark:hover:bg-yellow-600';
        return 'text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600';
    }

    return (
        <div className={`${priorityAccent()} border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm text-left transition-colors duration-150 hover:shadow-md w-full sm:w-80 md:w-80 h-40 flex flex-col`}>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {statusIcon()}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsEditOpen(true)} aria-label="Edit project" title="Edit" className="px-2 py-1 rounded-md bg-yellow-100 dark:bg-yellow-700 text-sm">✎</button>
                    <button onClick={handleDelete} aria-label="Delete project" title="Delete" className="px-2 py-1 rounded-md bg-red-100 dark:bg-red-700 text-sm">🗑</button>
                </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 flex-1 overflow-auto">{description}</p>

            <div className="flex flex-wrap gap-2 items-center mt-2">
                <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">Priority
                <SelectList selected={priority} options={PriorityOptions} onChange={handleSelectPriority} />
                </div>
                <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">Status
                <button onClick={handleCycleStatus} className={`px-3 py-1 rounded-md text-sm font-medium ${statusColors()}`}>
                    {status}
                </button>
                </div>
            </div>

            <EditProjectModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} project={{ id, title, description, priority, status }} setProjects={setProjects} />
        </div>
    );
}