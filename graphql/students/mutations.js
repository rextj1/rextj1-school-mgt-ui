import gql from 'graphql-tag'
import { SINGLE_STUDENT_FIELD_FRAGMENT } from './fragments'
// import { TEACHERS_FIELDS_FRAGMENT } from './fragments'

export const CREATE_STUDENT_MUTATION = gql`
  mutation CreateStudentMutation(
    $studentUser: StudentUserInput
    $student: StudentInput
  ) {
    createStudent(studentUser: $studentUser, student: $student) {
      id
    }
  }
`

export const UPDATE_STUDENT_MUTATION = gql`
  mutation UpdateStudentMutation(
    $id: ID!
    $studentUser: EditStudentUserInput
    $student: EditStudentInput
  ) {
    updateStudent(id: $id, studentUser: $studentUser, student: $student) {
      ...SingleStudentField
    }
  }
  ${SINGLE_STUDENT_FIELD_FRAGMENT}
`
export const DELETE_STUDENT_MUTATION = gql`
  mutation DeleteStudentMutation($id: Int!) {
    deleteStudent(id: $id)
  }
`