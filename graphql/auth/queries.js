import gql from 'graphql-tag'

import { USER_FIELDS_FRAGMENT } from '~/graphql/users/fragments'

export const USER_DETAILS_QUERY = gql`
  query UserDetailsQuery {
    me {
      ...UserFields
    }
  }
  ${USER_FIELDS_FRAGMENT}
`
