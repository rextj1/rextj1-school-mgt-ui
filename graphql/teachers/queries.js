import gql from 'graphql-tag'
import { KLASE_FIELDS_FRAGMENT } from '../klases/fragments'

import { TEACHER_FIELDS_FRAGMENT, TEACHERS_FIELDS_FRAGMENT } from './fragments'
// dashboard
export const TEACHER_DASHBOARD_QUERIES = gql`
  query TeachersDashboardQueries {
    teachersDashboard {
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
  query TeacherQuery($slug: String!) {
    teacher(slug: $slug) {
      ...TeachersFields
    }
  }
  ${TEACHERS_FIELDS_FRAGMENT}
`
// used by all
export const TEACHERS_QUERIES = gql`
  query TeachersQuery {
    teachers {
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
      teachers {
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
