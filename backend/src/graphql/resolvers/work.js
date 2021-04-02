import { schemaComposer } from 'graphql-compose'

import {
  HomeworkModel, HomeworkTC, ProjectModel, ProjectTC,
} from '../../models/work'

export const homeworkResolver = schemaComposer.createResolver({
  name: 'homework',
  kind: 'query',
  type: HomeworkTC.getType(),
  args: {
    userId: 'MongoID!',
  },
  resolve: async ({ args }) => {
    const { userId } = args
    const doc = await HomeworkModel.findOne({ memberIds: userId })
    return doc
  },
})
export const projectResolver = schemaComposer.createResolver({
  name: 'project',
  kind: 'query',
  type: ProjectTC.getType(),
  resolve: async ({ args }) => {
    const { userId } = args
    const doc = await ProjectModel.findOne({ memberIds: userId })
    return doc
  },
})
