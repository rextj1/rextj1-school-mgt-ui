import gql from 'graphql-tag'

export const EVENT_FIELDS_FRAGMENT = gql`
  fragment EventFields on Event {
    id
    slug
    description
    title
    photo
    published
    date
  }
`
