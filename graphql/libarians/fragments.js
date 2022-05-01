import gql from 'graphql-tag'
import { UXER_FIELDS_FRAGMENT } from '@/graphql/users/fragments'

export const LIBARIAN_FIELDS_FRAGMENT = gql`
  fragment LibarianFields on Libarian {
    id
    slug
    first_name
    last_name
    middle_name
    phone
    gender
    code
    email
    birthday
    photo
    qualification
    user {
      ...UxerFields
    }
  }
  ${UXER_FIELDS_FRAGMENT}
`
