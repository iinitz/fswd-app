import { ValidationError } from 'apollo-server-express'
import { schemaComposer } from 'graphql-compose'

import {
  HomeworkTC, ProjectTC, WorkModel, WorkTC,
} from '../../models'
import { requiredAuth } from '../middlewares'

export const createHomework = HomeworkTC.getResolver('createOne')
export const createProject = ProjectTC.getResolver('createOne')

export const joinGroup = schemaComposer.createResolver({
  name: 'joinGroup',
  kind: 'mutation',
  type: WorkTC.getType(),
  args: {
    workId: 'MongoID!',
  },
  resolve: async ({ args, context }) => {
    const { workId } = args
    const { _id: userId, role } = context.user
    if (role !== 'Student') {
      throw new ValidationError('Only student can join group')
    }
    const work = await WorkModel.findById(workId)
    if (!work) {
      throw new ValidationError('Invalid work ID')
    }
    if (work.memberIds.includes(userId)) {
      throw new ValidationError('You\'re already in group')
    }
    if (work.memberIds.length === work.membersLimit) {
      throw new ValidationError('Group members are full')
    }
    const userWork = await WorkModel.findOne({ type: work.type, memberIds: userId })
    if (userWork) {
      throw new ValidationError('You\'re already in other group')
    }
    const newWork = await WorkModel.findByIdAndUpdate(workId, { $push: { memberIds: userId } }, { new: true })
    return newWork
  },
}).wrapResolve(requiredAuth)
export const leaveGroup = schemaComposer.createResolver({
  name: 'leaveGroup',
  kind: 'mutation',
  type: WorkTC.getType(),
  args: {
    workId: 'MongoID!',
  },
  resolve: async ({ args, context }) => {
    const { workId } = args
    const { _id: userId, role } = context.user
    if (role !== 'Student') {
      throw new ValidationError('Only student can leave group')
    }
    const work = await WorkModel.findById(workId)
    if (!work) {
      throw new ValidationError('Invalid work ID')
    }
    const newWork = await WorkModel.findByIdAndUpdate(workId, { $pullAll: { memberIds: userId } }, { new: true })
    return newWork
  },
}).wrapResolve(requiredAuth)
