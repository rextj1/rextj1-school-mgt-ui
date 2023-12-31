import gql from 'graphql-tag'

import { EVENT_FIELDS_FRAGMENT } from './fragments'

export const EVENT_QUERIES = gql`
  query EventsWorkspaceQuery($workspaceId: Int!) {
    events(workspaceId: $workspaceId) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS_FRAGMENT}
`

export const SCHOOL_EVENT_QUERIES = gql`
  query EventsWorkspaceQuery($workspaceId: Int!) {
    schoolEvents(workspaceId: $workspaceId) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS_FRAGMENT}
`