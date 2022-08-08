import gql from 'graphql-tag'
import { KLASE_FIELDS_FRAGMENT } from '../klases/fragments'

import { TEACHER_FIELDS_FRAGMENT, TEACHERS_FIELDS_FRAGMENT } from './fragments'
// dashboard
export const TEACHER_DASHBOARD_QUERIES = gql`
  query TeachersDashboardQueries($workspaceId: Int) {
    teachersDashboard(workspaceId: $workspaceId) {
      id
    }
  }
`
// used by subject
export const TEACHER_QUERIES = gql`
  query TeachersQueries {
    teachers {
      ...TeacherFields
    }
  }
  ${TEACHER_FIELDS_FRAGMENT}
`

export const TEACHER_QUERY = gql`
  query TeacherQuery($id: Int!, $workspaceId: Int) {
    teacher(id: $id, workspaceId: $workspaceId) {
      ...TeachersFields
    }
  }
  ${TEACHERS_FIELDS_FRAGMENT}
`
// used by all
export const TEACHERS_QUERIES = gql`
  query TeachersQuery($workspaceId: Int) {
    teachers(workspaceId: $workspaceId) {
      ...TeachersFields
    }
  }
  ${TEACHERS_FIELDS_FRAGMENT}
`

export const USER_TEACHER_QUERY = gql`
  query userTeacher($id: ID!) {
    user(id: $id) {
      id
      blood_group {
        name
      }
      teacher {
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
        subjects {
          id
          subject
        }
        klases {
          ...KlaseFields
        }
      }
    }
  }
  ${KLASE_FIELDS_FRAGMENT}
`
