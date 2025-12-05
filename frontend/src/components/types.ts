export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface Stats {
  total: number;
  completed: number;
  pending: number;
  rate: number;
}