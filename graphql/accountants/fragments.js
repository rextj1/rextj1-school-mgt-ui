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
    facebook
    qualification
    user {
      ...UxerFields
    }
  }
  ${UXER_FIELDS_FRAGMENT}
`
