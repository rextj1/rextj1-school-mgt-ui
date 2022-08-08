import gql from 'graphql-tag'

export const CHANGE_USER_PASSWORD_MUTATION = gql`
  mutation ChangeUserPasswordMutation($id: Int!, $confirmPassword: String!) {
    updateUserPassword(id: $id, confirmPassword: $confirmPassword)
  }
`
