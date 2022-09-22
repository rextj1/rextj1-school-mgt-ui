import gql from 'graphql-tag'
import { SINGLE_STUDENT_FIELD_FRAGMENT } from '../students/fragments'

import { GUARDIANS_FIELDS_FRAGMENT } from './fragments'

export const GUARDIANS_QUERIES = gql`
  query GuardiansQuery {
    guardians {
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
      user {
        id
        email
      }
    }
  }
`
export const USER_GUARDIAN_QUERY = gql`
  query userGuardian($id: ID!) {
    user(id: $id) {
      id
      blood_group {
        name
      }
      guardian {
        id
        slug
        email
        students {
          ...SingleStudentField
        }
      }
    }
  }
  ${SINGLE_STUDENT_FIELD_FRAGMENT}
`

// dashboard

export const GUARDIAN_DASHBOARD_QUERIES = gql`
  query GuardianDashboardQuery($workspaceId: Int) {
    guardiansDashboard(workspaceId: $workspaceId) {
      id
    }
  }
`
