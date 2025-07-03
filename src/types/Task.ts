export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
 status: 'Pending' | 'In Progress' | 'Completed';
}