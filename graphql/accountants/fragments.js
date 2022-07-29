import gql from 'graphql-tag'
import { UXER_FIELDS_FRAGMENT } from '@/graphql/users/fragments'

export const ACCOUNTANT_FIELDS_FRAGMENT = gql`
  fragment AccountantFields on Accountant {
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
export const ACCOUNTANT_USER_FRAGMENT = gql`
  fragment AccountantUserFields on Accountant {
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
