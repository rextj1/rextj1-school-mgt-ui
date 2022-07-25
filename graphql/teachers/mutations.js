import gql from 'graphql-tag'
import { TEACHERS_FIELDS_FRAGMENT } from './fragments'

export const CREATE_TEACHER_MUTATION = gql`
  mutation CreateTeacherMutation(
    $workspaceId: Int
    $userTable: UsersInput
    $teacherTable: WorkersInput
  ) {
    createTeacher(
      workspaceId: $workspaceId
      userTable: $userTable
      teacherTable: $teacherTable
    ) {
      id
    }
  }
`

export const UPDATE_TEACHER_MUTATION = gql`
  mutation UpdateTeacherMutation(
    $id: ID!
    $workspaceId: Int
    $userTable: UsersInput
    $teacherTable: WorkersInput
  ) {
    updateTeacher(
      id: $id
      userTable: $userTable
      teacherTable: $teacherTable
      workspaceId: $workspaceId
    ) {
      ...TeachersFields
    }
  }
  ${TEACHERS_FIELDS_FRAGMENT}
`
export const DELETE_TEACHER_MUTATION = gql`
  mutation DeleteTeacherMutation($id: Int!, $workspaceId: Int) {
    deleteTeacher(id: $id, workspaceId: $workspaceId)
  }
`
