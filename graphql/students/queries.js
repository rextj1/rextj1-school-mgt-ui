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
export const USER_STUDENT_QUERY = gql`
  query userStudent($id: ID!) {
    user(id: $id) {
      id
      blood_group {
        name
      }
      country {
        id
        name
      }
      state {
        id
        name
      }
      city {
        id
        name
      }
      lga
      student {
        id
        slug
        first_name
        last_name
        middle_name
        phone
        gender
        photo
        adm_no
        code
        status
        klase {
          id
          name
        }
        address
        admitted_year
        guardian_name
        guardian_no
        guardian_email
        guardian_address
        term {
          id
          name
        }
        cum_avg
        session {
          id
          name
        }
        birthday
      }
    }
  }
`
