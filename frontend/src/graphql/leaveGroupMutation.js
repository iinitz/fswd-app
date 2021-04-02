import { gql } from '@apollo/client'

export const LEAVE_GROUP_MUTATION = gql`
mutation ($workId: MongoID!) {
  leaveGroup (workId: $workId) {
    _id
  }
}
`
