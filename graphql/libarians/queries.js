import gql from 'graphql-tag'
import { LIBARIAN_FIELDS_FRAGMENT } from './fragments'

export const LIBARIAN_QUERIES = gql`
  query LibariansQuery {
    libarians {
      ...LibarianFields
    }
  }
  ${LIBARIAN_FIELDS_FRAGMENT}
`
export const LIBARIAN_QUERY = gql`
  query libarianQuery($slug: String!) {
    libarian(slug: $slug) {
      ...LibarianFields
    }
  }
  ${LIBARIAN_FIELDS_FRAGMENT}
`

export const USER_LIBARIAN_QUERY = gql`
  query userLibarian($id: ID!) {
    user(id: $id) {
      id
      blood_group {
        name
      }
      libarians {
        id
        slug
        first_name
        last_name
        middle_name
        phone
        gender
        code
        photo
        birthday
        qualification
      }
    }
  }
`
