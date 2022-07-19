import gql from 'graphql-tag'

export const SECTION_QUERIES = gql`
  query SectionsQuery {
    sections {
      id
      name
    }
  }
`
export const SECTION_QUERY = gql`
  query SectionQuery($id: Int!) {
    section(id: $id) {
      id
      name
    }
  }
`