import { gql } from '@apollo/client'

export const ME_DETAIL_QUERY = gql`
query {
  me {
    _id
    role
    name
    ... on Developer {
      project {
        ...workDetail
      }
      homework {
        ...workDetail
      }
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
