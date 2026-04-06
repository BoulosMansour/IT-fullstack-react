import React, { useState } from 'react';
import { PriorityOptions, Status, type PriorityType, type Project } from '../types/types';

type NewProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose, setProjects }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<PriorityType | ''>(PriorityOptions[0]);
  const [errors, setErrors] = useState<{ title?: string; description?: string; priority?: string; status?: string }>({});

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors: { title?: string; description?: string; priority?: string; status?: string } = {};
    if (!title.trim()) nextErrors.title = 'Title is required.';
    if (!description.trim()) nextErrors.description = 'Description is required.';
    if (!priority) nextErrors.priority = 'Priority is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCloseModal = () => {
    setTitle('');
    setDescription('');
    setPriority(PriorityOptions[0]);
    setErrors({});
    onClose();
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setProjects(prev => {
      const nextId = prev.length ? Math.max(...prev.map(p => p.id)) + 1 : 1;
      const newProject: Project = {
        id: nextId,
        title: title,
        description: description,
        priority: priority as PriorityType,
        status: Status.NotStarted,
      };
      return [newProject, ...prev];
    });
    // reset and close
    setTitle('');
    setDescription('');
    setPriority(PriorityOptions[0]);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden text-left">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-300" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create New Project</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Add a new project to your workspace. You can edit details later.</p>
          </div>
          <div className="ml-auto">
            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-md p-1"> 
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input aria-invalid={!!errors.title} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Marketing website" className="w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea aria-invalid={!!errors.description} value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description of the project" className="w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 h-28 resize-none" />
            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
          </div>

          <div className="flex flex-row items-center gap-6">
        
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select aria-invalid={!!errors.priority} value={priority as string} onChange={e => setPriority(e.target.value as PriorityType)} className="w-40 px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm">
                {PriorityOptions.map((opt, i) => (
                  <option key={i} value={String(opt)}>{String(opt)}</option>
                ))}
              </select>
              {errors.priority && <p className="mt-1 text-xs text-red-600">{errors.priority}</p>}
       
          </div>
          
            <div className="flex items-end justify-end">
              <div className="flex gap-3">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed">Create project</button>
         
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProjectModal;
