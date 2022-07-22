import gql from 'graphql-tag'

export const SECTION_QUERIES = gql`
  query SectionsQuery($slug: String) {
    sections(slug: $slug) {
      id
      name
    }
  }
`
export const SECTION_QUERY = gql`
  query SectionQuery($id: Int!, $slug: String) {
    section(id: $id, slug: $slug) {
      id
      name
    }
  }
`
