export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'

export type Task = {
  id: string
  title: string
  description: string | null
  priority: Priority
  dueDate: string | null
  isCompleted: boolean
  project: { id: string; name: string } | null
}
