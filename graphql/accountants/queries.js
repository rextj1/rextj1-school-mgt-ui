import gql from 'graphql-tag'
import {
  ACCOUNTANT_FIELDS_FRAGMENT,
  ACCOUNTANT_USER_FRAGMENT,
} from './fragments'

export const ACCOUNTANT_QUERIES = gql`
  query AccountantsQuery($workspaceId: Int) {
    accountants(workspaceId: $workspaceId) {
      ...AccountantFields
    }
  }
  ${ACCOUNTANT_FIELDS_FRAGMENT}
`
export const ACCOUNTANT_QUERY = gql`
  query accountantQuery($id: ID!, $workspaceId: Int) {
    accountant(id: $id, workspaceId: $workspaceId) {
      ...AccountantFields
    }
  }
  ${ACCOUNTANT_FIELDS_FRAGMENT}
`
export const USER_ACCOUNTANT_QUERY = gql`
  query userAccountant($id: ID!) {
    user(id: $id) {
      id
      blood_group {
        id
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
      accountant {
        ...AccountantUserFields
      }
    }
  }
  ${ACCOUNTANT_USER_FRAGMENT}
`
