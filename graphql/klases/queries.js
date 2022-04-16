import gql from 'graphql-tag'

import { KLASE_FIELDS_FRAGMENT } from './fragments'

export const KLASE_QUERIES = gql`
  query myclassQuery {
    klases {
      ...KlaseFields
    }
  }
  ${KLASE_FIELDS_FRAGMENT}
`

export const KLASES_QUERIES = gql`
  query myclassesQuery {
    klases{
      id
      name
    }
  }
`
