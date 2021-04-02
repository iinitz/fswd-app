import { DeveloperTC } from '../../models'
import { homeworkResolver, projectResolver } from '../resolvers/work'

DeveloperTC.addRelation(
  'homework',
  {
    resolver: homeworkResolver,
    prepareArgs: {
      userId: (source) => (source._id),
    },
    projection: { _id: 1 },
  },
)
DeveloperTC.addRelation(
  'project',
  {
    resolver: projectResolver,
    prepareArgs: {
      userId: (source) => (source._id),
    },
    projection: { _id: 1 },
  },
)
