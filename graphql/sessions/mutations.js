import gql from 'graphql-tag'

export const CREATE_SESSION_MUTATION = gql`
  mutation createSessionwMutation($name: String!, $workspace: String) {
    createSessionw(name: $name, workspace: $workspace) {
      id
      name
    }
  }
`
export const UPDATE_SESSION_MUTATION = gql`
  mutation updateSessionMutation($id: ID!, $name: String!, $workspace: String) {
    updateSessionw(id: $id, name: $name, workspace: $workspace) {
      id
      name
    }
  }
`
