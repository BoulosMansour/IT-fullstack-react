const Priority = {
  Low: 'Bassa',
  Medium: 'Media',
  High: 'Alta',
} as const;

const Status = {
  NotStarted: 'Da Iniziare',
  InProgress: 'In Corso',
  Completed: 'Completato',
} as const;

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  priority: PriorityType;
  status: StatusType;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

interface Project {
    id: number;
    title: string;
    description: string;
    priority: PriorityType;
    status: StatusType;
}

const PriorityOptions = Object.values(Priority);
const StatusOptions = Object.values(Status);

type PriorityType = typeof Priority[keyof typeof Priority];
type StatusType = typeof Status[keyof typeof Status];

export type { PriorityType, StatusType, ProjectCardProps, Project };
export { PriorityOptions, StatusOptions, Priority, Status };