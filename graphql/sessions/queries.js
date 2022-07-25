import gql from 'graphql-tag'

export const SESSION_QUERIES = gql`
  query SessionsQuery($workspaceId: Int) {
    sessions(workspaceId: $workspaceId) {
      id
      name
    }
  }
`

export const SESSION_QUERY = gql`
  query SessionQuery($id: Int!, $workspaceId: Int) {
    session(id: $id, workspaceId: $workspaceId) {
      id
      name
    }
  }
`
