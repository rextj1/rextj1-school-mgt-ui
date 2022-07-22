import gql from 'graphql-tag'
import { EVENT_FIELDS_FRAGMENT } from './fragments'

export const CREATE_EVENT_MUTATION = gql`
  mutation CreateMutation(
    $description: String!
    $title: String
    $photo: Upload
    $date: String!
    $workspace: String
  ) {
    createEvent(
      description: $description
      title: $title
      photo: $photo
      date: $date
      workspace: $workspace
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
    $workspace: String
  ) {
    updateEvent(
      id: $id
      description: $description
      title: $title
      photo: $photo
      date: $date
      workspace: $workspace
    ) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS_FRAGMENT}
`

export const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEventMutation($workspace: String!, $id: Int!) {
    deleteEvent(workspace: $workspace, id: $id){
      id
    }
  }
`
export const PUBLISH_EVENT_MUTATION = gql`
  mutation PublishEventMutation($workspace: String!, $id: Int!) {
    publishEvent(workspace: $workspace, id: $id){
      id
      published
    }
  }
`
// export const CREATE_ROW_MUTATION = gql`
//   mutation UpdatexMutation($description: [ObjectT]) {
//     createRow(description: $description) {
//       id
//     }
//   }
// `
