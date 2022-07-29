import gql from 'graphql-tag'

import {
  STUDENT_FIELDS_FRAGMENT,
  SINGLE_STUDENT_FIELD_FRAGMENT,
} from './fragments'

export const STUDENT_QUERIES = gql`
  query StudentsQuery($workspaceId: Int) {
    students(workspaceId: $workspaceId) {
      ...StudentFields
    }
  }
  ${STUDENT_FIELDS_FRAGMENT}
`
// DASHBOARD
export const STUDENT_DASHBOARD_QUERIEX = gql`
  query StudentxDashdashboardQuery($workspaceId: Int) {
    studentsDashboard(workspaceId: $workspaceId) {
      id
    }
  }
`

export const STUDENT_QUERY = gql`
  query StudentQuery($id: Int!, $workspaceId: Int) {
    student(id: $id, workspaceId: $workspaceId) {
      ...StudentFields
    }
  }
  ${STUDENT_FIELDS_FRAGMENT}
`
