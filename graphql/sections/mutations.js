import gql from 'graphql-tag'

export const CREATE_SECTION_MUTATION = gql`
  mutation createSectionMutation($name: String!, $workspaceId: Int) {
    createSection(name: $name, workspaceId: $workspaceId) {
      id
      name
    }
  }
`
export const UPDATE_SECTION_MUTATION = gql`
  mutation updateSectionMutation($id: ID!, $name: String!, $workspaceId: Int) {
    updateSection(id: $id, name: $name, workspaceId: $workspaceId) {
      id
      name
    }
  }
`
