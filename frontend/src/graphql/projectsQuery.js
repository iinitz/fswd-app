import { gql } from '@apollo/client'

export const PROJECTS_QUERY = gql`
query {
  projects {
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
