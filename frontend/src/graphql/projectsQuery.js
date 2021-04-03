import { gql } from '@apollo/client'

export const PROJECTS_QUERY = gql`
query {
  projects (sort: _ID_ASC) {
    _id
    type
    name
    url
    repo
    members {
      _id
      username
      name
    }
    membersCount
    membersLimit
  }
}
`
