import gql from 'graphql-tag'
import { EVENT_FIELDS_FRAGMENT } from './fragments'

export const CREATE_EVENT_MUTATION = gql`
  mutation CreateMutation(
    $description: String
    $date: String
    $workspaceId: Int!
  ) {
    createEvent(
      description: $description
      date: $date
      workspaceId: $workspaceId
    ) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS_FRAGMENT}
`

export const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateMutation(
    $id: ID!
    $description: String
    $date: String
    $workspaceId: Int!
  ) {
    updateEvent(
      id: $id
      description: $description
      date: $date
      workspaceId: $workspaceId
    ) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS_FRAGMENT}
`

export const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEventMutation($workspaceId: Int!, $id: Int!) {
    deleteEvent(workspaceId: $workspaceId, id: $id) {
      id
    }
  }
`
export const PUBLISH_EVENT_MUTATION = gql`
  mutation PublishEventMutation($workspaceId: Int!, $id: Int!) {
    publishEvent(workspaceId: $workspaceId, id: $id) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS_FRAGMENT}
`
export const BULK_DELETE_EVENT_MUTATION = gql`
  mutation BulkDeleteEventMutation($workspaceId: Int!, $ids: [String!]) {
    bulkDeleteEvent(workspaceId: $workspaceId, ids: $ids)
  }
`
