import gql from 'graphql-tag'

export const CREATE_SECTION_MUTATION = gql`
  mutation createSectionMutation($name: String!) {
    createSection(name: $name) {
      id
      name
    }
  }
`
export const UPDATE_SECTION_MUTATION = gql`
  mutation updateSectionMutation($id: ID!, $name: String!) {
    updateSection(id: $id, name: $name) {
      id
      name
    }
  }
`
