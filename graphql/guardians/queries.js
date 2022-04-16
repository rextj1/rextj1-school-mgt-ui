import gql from 'graphql-tag'

import { GUARDIANS_FIELDS_FRAGMENT } from './fragments'

export const GUARDIANS_QUERIES = gql`
  query GuardiansQuery {
    guardianss {
      ...GuardiansFields
    }
  }
  ${GUARDIANS_FIELDS_FRAGMENT}
`
export const GUARDIAN_QUERIES = gql`
  query GuardianQuery {
    guardians {
      id
      slug
    }
  }
`
