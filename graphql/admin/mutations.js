import gql from 'graphql-tag'
import { SCHOOL_ADMIN_FIELDS_FRAGMENT } from './fragments'

export const CREATE_SCHOOL_ADMIN_MUTATION = gql`
  mutation CreateSchoolAdminMutation(
    $workspaceId: Int
    $userTable: UsersInput
    $schoolAdminTable: WorkersInput
  ) {
    createSchoolAdmin(
      workspaceId: $workspaceId
      userTable: $userTable
      schoolAdminTable: $schoolAdminTable
    ) {
      id
    }
  }
`

export const UPDATE_SCHOOL_ADMIN_MUTATION = gql`
  mutation UpdateSchoolAdminMutation(
    $id: ID!
    $workspaceId: Int
    $userTable: EditUsersInput
    $schoolAdminTable: WorkersInput
  ) {
    updateSchoolAdmin(
      id: $id
      userTable: $userTable
      schoolAdminTable: $schoolAdminTable
      workspaceId: $workspaceId
    ) {
      ...schoolAdminFields
    }
  }
  ${SCHOOL_ADMIN_FIELDS_FRAGMENT}
`
export const DELETE_SCHOOL_ADMIN_MUTATION = gql`
  mutation DeleteSchoolAdminMutation($id: Int!, $workspaceId: Int) {
    deleteSchoolAdmin(id: $id, workspaceId: $workspaceId)
  }
`
