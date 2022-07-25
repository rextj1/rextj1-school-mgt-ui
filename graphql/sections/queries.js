import gql from 'graphql-tag'

export const SECTION_QUERIES = gql`
  query SectionsQuery($workspaceId: Int) {
    sections(workspaceId: $workspaceId) {
      id
      name
    }
  }
`
export const SECTION_QUERY = gql`
  query SectionQuery($id: Int!, $workspaceId: Int) {
    section(id: $id, workspaceId: $workspaceId) {
      id
      name
    }
  }
`
