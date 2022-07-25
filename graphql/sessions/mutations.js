import gql from 'graphql-tag'

export const CREATE_SESSION_MUTATION = gql`
  mutation createSessionwMutation($name: String!, $workspaceId: Int) {
    createSessionw(name: $name, workspaceId: $workspaceId) {
      id
      name
    }
  }
`
export const UPDATE_SESSION_MUTATION = gql`
  mutation updateSessionMutation($id: ID!, $name: String!, $workspaceId: Int) {
    updateSessionw(id: $id, name: $name, workspaceId: $workspaceId) {
      id
      name
    }
  }
`
