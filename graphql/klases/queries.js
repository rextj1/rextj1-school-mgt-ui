import gql from 'graphql-tag'

import { KLASE_FIELDS_FRAGMENT } from './fragments'

// export const KLASES_SUBJECT_QUERIES = gql`
//   query myclassesQuery {
//     klases {
//       ...KlaseFields
//     }
//   }
//   ${KLASE_FIELDS_FRAGMENT}
// `

export const KLASE_QUERIES = gql`
  query myclassQuery {
    klases {
      id
      name
      teachers {
        id
        first_name
        last_name
        slug
      }
    }
  }
`

export const KLASE_QUERY = gql`
  query klaseQuery($id: ID!) {
    klase(id: $id) {
      id
      name
    }
  }
`
export const KLASES_QUERIES = gql`
  query myclassesQuery {
    klases {
      id
      name
    }
  }
`