import gql from 'graphql-tag'

import { STUDENT_FIELD_FRAGMENT, STUDENT_FIELDS_FRAGMENT } from './fragments'

export const STUDENT_QUERIES = gql`
  query StudentsQuery {
    students {
      ...StudentFields
    }
  }
  ${STUDENT_FIELDS_FRAGMENT}
`
export const STUDENT_QUERIEX = gql`
  query StudentxQuery {
    students {
      ...StudentField
    }
  }
  ${STUDENT_FIELD_FRAGMENT}
`
