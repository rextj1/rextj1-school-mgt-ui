import gql from 'graphql-tag'
import { KLASE_FIELDS_FRAGMENT } from '~/graphql/klases/fragments'
import { UXER_FIELDS_FRAGMENT } from '@/graphql/users/fragments'
// import { SUBJECTS_FIELDS_FRAGMENT } from '@/graphql/subjects/fragments'

export const STUDENT_FIELDS_FRAGMENT = gql`
  fragment StudentFields on Student {
    id
    slug
    first_name
    last_name
    middle_name
    phone
    gender
    code
    photo
    instagram
    facebook
    twitter
    qualification
    klases {
      ...KlaseFields
    }
    user {
      ...UxerFields
    }
  }
  ${KLASE_FIELDS_FRAGMENT}
  ${UXER_FIELDS_FRAGMENT}
`
export const STUDENT_FIELD_FRAGMENT = gql`
  fragment StudentField on Student {
    id
    slug
    first_name
    last_name
    middle_name
    phone
    gender
    code
    photo
  }
`
