import gql from 'graphql-tag'

export const SECTION_QUERIES = gql`
  query SectionsQuery($workspaceId: Int, $klase_id: Int!) {
    sections(workspaceId: $workspaceId, klase_id: $klase_id) {
      id
      name
      klase {
        id
        name
      }
    }
  }
`
export const SECTION_QUERY = gql`
  query SectionQuery($id: Int!, $workspaceId: Int) {
    section(id: $id, workspaceId: $workspaceId) {
      id
      name
      klase {
        id
        name
      }
    }
  }
`
