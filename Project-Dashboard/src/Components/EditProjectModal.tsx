import React, { useState } from 'react';
import { type Project, type PriorityType, type StatusType } from '../types/types';

type EditProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ isOpen, onClose, project, setProjects }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors: { title?: string; description?: string } = {};
    if (!title.trim()) nextErrors.title = 'Title is required.';
    if (!description.trim()) nextErrors.description = 'Description is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setProjects(prev => prev.map(p => p.id === project.id ? { ...p, title, description } : p));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Edit Project</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input aria-invalid={!!errors.title} value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-300" />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea aria-invalid={!!errors.description} value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-300" rows={3} />
            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-500">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProjectModal;
