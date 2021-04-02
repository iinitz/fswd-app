import { gql } from '@apollo/client'

export const JOIN_GROUP_MUTATION = gql`
mutation ($workId: MongoID!) {
  joinGroup (workId: $workId) {
    _id
  }
}
`
