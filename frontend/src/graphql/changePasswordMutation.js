import { gql } from '@apollo/client'

export const CHANGE_PASSWORD_MUTATION = gql`
mutation ($password: String!) {
  changePassword (password: $password) {
    user {
      _id
    }
  }
}
`
