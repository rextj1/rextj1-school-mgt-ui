import gql from 'graphql-tag'
import { ACCOUNTANT_FIELDS_FRAGMENT } from './fragments'

export const ACCOUNTANT_QUERIES = gql`
  query AccountantsQuery($workspaceId: Int) {
    accountants(workspaceId: $workspaceId) {
      ...AccountantFields
    }
  }
  ${ACCOUNTANT_FIELDS_FRAGMENT}
`
export const ACCOUNTANT_QUERY = gql`
  query accountantQuery($id: Int!, $workspaceId: Int) {
    accountant(id: $id, workspaceId: $workspaceId) {
      ...AccountantFields
    }
  }
  ${ACCOUNTANT_FIELDS_FRAGMENT}
`
