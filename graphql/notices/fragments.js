import gql from 'graphql-tag'

export const NOTICE_FIELDS_FRAGMENT = gql`
  fragment NoticeFields on Notice {
    id
    slug
    description
    status
    date
  }
`
