import gql from 'graphql-tag'
import { LIBARIAN_FIELDS_FRAGMENT } from './fragments'

export const CREATE_LIBARIAN_MUTATION = gql`
  mutation CreateLibarianMutation(
    $workspaceId: Int
    $userTable: UsersInput
    $teacherTable: WorkersInput
  ) {
    createLibarian(
      workspaceId: $workspaceId
      userTable: $userTable
      teacherTable: $teacherTable
    ) {
      id
    }
  }
`

export const UPDATE_LIBARIAN_MUTATION = gql`
  mutation UpdateLibarianMutation(
    $id: ID!
    $workspaceId: Int
    $userTable: UsersInput
    $teacherTable: WorkersInput
  ) {
    updateLibarian(
      id: $id
      workspaceId: $workspaceId
      userTable: $userTable
      teacherTable: $teacherTable
    ) {
      ...LibarianFields
    }
  }
  ${LIBARIAN_FIELDS_FRAGMENT}
`
export const DELETE_LIBARIAN_MUTATION = gql`
  mutation DeleteLibarianMutation($id: Int!, $workspaceId: Int) {
    deleteLibarian(id: $id, workspaceId: $workspaceId)
  }
`
