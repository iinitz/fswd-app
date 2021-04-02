import { HomeworkTC, ProjectTC } from '../../models/work'

export const homeworks = HomeworkTC.getResolver('findMany')
export const homeworkId = HomeworkTC.getResolver('findById')
export const projects = ProjectTC.getResolver('findMany')
export const projectId = ProjectTC.getResolver('findById')
