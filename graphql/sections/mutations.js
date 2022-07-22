import gql from 'graphql-tag'

export const CREATE_SECTION_MUTATION = gql`
  mutation createSectionMutation($name: String!, $workspace: String) {
    createSection(name: $name, workspace: $workspace) {
      id
      name
    }
  }
`
export const UPDATE_SECTION_MUTATION = gql`
  mutation updateSectionMutation($id: ID!, $name: String!, $workspace: String) {
    updateSection(id: $id, name: $name, workspace: $workspace) {
      id
      name
    }
  }
`
