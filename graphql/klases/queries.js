import gql from 'graphql-tag'

import { KLASE_FIELDS_FRAGMENT } from './fragments'

export const KLASES_QUERIES = gql`
  query myclassesQuery {
    klases {
      ...KlaseFields
    }
  }
  ${KLASE_FIELDS_FRAGMENT}
`

export const KLASE_QUERIES = gql`
  query myclassQuery {
    klases {
      id
      name
    }
  }
`
