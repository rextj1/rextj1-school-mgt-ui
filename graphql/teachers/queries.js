import gql from 'graphql-tag'

import { TEACHER_FIELDS_FRAGMENT, TEACHERS_FIELDS_FRAGMENT } from './fragments'
// dashboard
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
