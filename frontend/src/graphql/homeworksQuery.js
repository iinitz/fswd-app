import { gql } from '@apollo/client'

export const HOMEWORKS_QUERY = gql`
query {
  homeworks {
    _id
    type
    name
    url
    repo
    members {
      _id
      name
    }
    membersCount
    membersLimit
  }
}
`
