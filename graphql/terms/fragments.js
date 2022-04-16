import gql from 'graphql-tag'

export const TERM_FIELDS_FRAGMENT = gql`
  fragment TermFields on Term {
    id
    name
  }
`
