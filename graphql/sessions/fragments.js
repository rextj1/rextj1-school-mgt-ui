import gql from 'graphql-tag'

export const SESSION_FIELDS_FRAGMENT = gql`
  fragment SessionFields on Session {
    id
    year
  }
`
