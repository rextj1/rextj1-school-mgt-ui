import gql from 'graphql-tag'
import { UXER_FIELDS_FRAGMENT } from '@/graphql/users/fragments'

export const TEACHER_FIELDS_FRAGMENT = gql`
  fragment TeacherFields on Teacher {
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
  }
`
export const SCHOOL_ADMIN_FIELDS_FRAGMENT = gql`
  fragment schoolAdminFields on SchoolAdmin {
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
    user {
      ...UxerFields
    }
  }
  ${UXER_FIELDS_FRAGMENT}
`