import { gql } from '@apollo/client'

export const DEVELOPERS_QUERY = gql`
query {
  developers {
    _id
    username
    name
    project {
      ...workDetail
    }
    homework {
      ...workDetail
    }
  }
}
fragment workDetail on WorkInterface {
  _id
  name
  url
  repo
}
`
