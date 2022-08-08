import gql from 'graphql-tag'
import { UXER_FIELDS_FRAGMENT } from '../users/fragments'

export const ADMIN_WORKSPACE_QUERIES = gql`
  query adminWorkspaceQuery($workspaceId: Int!, $status: Int) {
    adminWorkspace(workspaceId: $workspaceId, status: $status) {
      id
      logo
      stamp
      email
      status
      paystack_secret_key
    }
  }
`
export const SCHOOL_QUERIES = gql`
  query SchoolsQuery {
    schools {
      id
      name
      slug
      email
      status
    }
  }
`
export const SCHOOL_QUERY = gql`
  query SchoolQuery($id: ID!) {
    school(id: $id) {
      id
      name
      slug
      email
      status
      user {
        ...UxerFields
      }
    }
  }
  ${UXER_FIELDS_FRAGMENT}
`
