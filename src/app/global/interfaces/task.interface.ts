export interface Task {
  _id?: string;
  name: string;
  description: string;
  status: string;
  owner: string;
  assigned: string;
  due_date: string;
}
