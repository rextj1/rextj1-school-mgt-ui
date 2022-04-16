import gql from 'graphql-tag'

import { EVENT_FIELDS_FRAGMENT } from './fragments'

export const EVENT_QUERIES = gql`
  query EventsQuery {
    events {
      ...EventFields
    }
  }
  ${EVENT_FIELDS_FRAGMENT}
`
