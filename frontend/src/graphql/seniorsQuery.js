import { gql } from '@apollo/client'

export const SENIORS_QUERY = gql`
query {
  seniors {
    _id
    username
    name
    title
    company
    contact {
      github
      discord
      facebook
      twitter
      other
    }
  }
}
`
