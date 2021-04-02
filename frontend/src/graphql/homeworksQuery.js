import { gql } from '@apollo/client'

export const HOMEWORKS_QUERY = gql`
query {
  homeworks {
    _id
    name
    url
    repo
    members {
      _id
      name
    }
    membersCount
  }
}
`
