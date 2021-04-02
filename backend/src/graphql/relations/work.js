import { UserTC, WorkTC } from '../../models'

WorkTC.addFields({
  membersCount: {
    type: 'String',
    resolve: (source) => {
      const { memberIds, membersLimit } = source
      return `${memberIds.length}/${membersLimit}`
    },
    projection: { memberIds: 1, membersLimit: 1 },
  },
})
WorkTC.addRelation(
  'members',
  {
    resolver: UserTC.getResolver('findMany'),
    prepareArgs: {
      filter: (source) => ({
        _operators: {
          _id: {
            in: source.memberIds,
          },
        },
      }),
    },
    projection: { memberIds: 1 },
  },
)
