import gql from 'graphql-tag'
import { EVENT_FIELDS_FRAGMENT } from './fragments'

export const CREATE_EVENT_MUTATION = gql`
  mutation CreateMutation(
    $description: String!
    $title: String
    $photo: Upload
    $date: String!
    $workspaceId: Int!
  ) {
    createEvent(
      description: $description
      title: $title
      photo: $photo
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
    $description: String!
    $title: String
    $photo: Upload
    $date: String!
    $workspaceId: Int!
  ) {
    updateEvent(
      id: $id
      description: $description
      title: $title
      photo: $photo
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
    deleteEvent(workspaceId: $workspaceId, id: $id){
      id
    }
  }
`
export const PUBLISH_EVENT_MUTATION = gql`
  mutation PublishEventMutation($workspaceId: Int!, $id: Int!) {
    publishEvent(workspaceId: $workspaceId, id: $id){
      id
      published
    }
  }
`