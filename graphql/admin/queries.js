import gql from 'graphql-tag'

import {
  SCHOOL_ADMIN_FIELDS_FRAGMENT
} from './fragments'

export const SCHOOL_ADMIN_QUERY = gql`
  query SchoolAdminQuery($id: Int!, $workspaceId: Int) {
    schoolAdmin(id: $id, workspaceId: $workspaceId) {
      ...schoolAdminFields
    }
  }
  ${SCHOOL_ADMIN_FIELDS_FRAGMENT}
`
// used by all
export const SCHOOL_ADMIN_QUERIES = gql`
  query SchoolAdminsQuery($workspaceId: Int) {
    schoolAdmins(workspaceId: $workspaceId) {
      ...schoolAdminFields
    }
  }
  ${SCHOOL_ADMIN_FIELDS_FRAGMENT}
`

export const USER_SCHOOL_ADMIN_QUERY = gql`
  query userTeacher($id: ID!) {
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
      schoolAdmin {
        id
        slug
        first_name
        last_name
        middle_name
        phone
        gender
        code
        photo
        birthday
        qualification
        year_of_hire
      }
    }
  }
`
