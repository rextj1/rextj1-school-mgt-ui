import gql from 'graphql-tag'

export const SESSION_QUERIES = gql`
  query SessionswQuery($slug: String) {
    sessionsw(slug: $slug) {
      id
      name
    }
  }
`

export const SESSION_QUERY = gql`
  query SessionwQuery($id: Int!, $slug: String) {
    sessionw(id: $id, slug: $slug) {
      id
      name
    }
  }
`
