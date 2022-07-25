import gql from 'graphql-tag'

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
        students {
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
  }
`

// dashboard

export const GUARDIAN_DASHBOARD_QUERIES = gql`
  query GuardianDashboardQuery($workspaceId: Int) {
    guardiansDashboard(workspaceId: $workspaceId) {
      id
    }
  }
`
