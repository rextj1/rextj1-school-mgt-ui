import gql from 'graphql-tag'

import {
  STUDENT_FIELDS_FRAGMENT,
  SINGLE_STUDENT_FIELD_FRAGMENT,
} from './fragments'

export const STUDENT_QUERIES = gql`
  query StudentsQuery {
    students {
      ...StudentFields
    }
  }
  ${STUDENT_FIELDS_FRAGMENT}
`
// DASHBOARD
export const STUDENT_DASHBOARD_QUERIEX = gql`
  query StudentxDashdashboardQuery {
    studentsDashboard {
      id
    }
  }
`

export const STUDENT_QUERY = gql`
  query StudentQuery($slug: String!) {
    student(slug: $slug) {
      ...StudentFields
    }
  }
  ${STUDENT_FIELDS_FRAGMENT}
`