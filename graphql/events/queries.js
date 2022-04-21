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
export const EVENT_QUERY = gql`
  query EventQuery($id: ID!) {
    event(id: $id) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS_FRAGMENT}
`
