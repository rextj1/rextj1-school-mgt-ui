import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      token
      expires_in
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout
  }
`
