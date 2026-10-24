import { z } from 'zod'

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'
export type Status = 'WAITING' | 'INPROGRESS' | 'DONE'
export type Role = 'USER' | 'ADMIN'

export type Project = {
  name: string
  // userId: string
  // tasks?: Task[];
}

export type Task = {
  name: string
  description: string
  dueDate: Date
  projectId: string
  priority: Priority
  status: Status
}

export const ProjectSchema = z.object({
  name: z.string().min(3, "نام باید بیشتر از 3 حرف باشد"),
})

export const TaskSchema = z.object({
  name: z.string().trim().min(3, "نام باید بیشتر از 3 حرف باشد"),
  description: z.string().trim().min(3, "توضیحات باید بیشتر از 3 حرف باشد"),
  dueDate: z.coerce.date({
  error: "یک تاریخ معتبر انتخاب کنید",
}),
  projectId: z.string().min(1, "یک پروژه را انتخاب کنید"),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH'], "این اولویت قابل استفاده نیست"),
  status: z.enum(['WAITING', 'INPROGRESS', 'DONE'], "این وضعیت غیر قابل قبول است"),
})
