import gql from 'graphql-tag'

export const CREATE_EVENT_MUTATION = gql`
  mutation CreateMutation(
    $description: String!
    $title: String
    $photo: Upload
    $date: String!
  ) {
    createEvent(
      description: $description
      title: $title
      photo: $photo
      date: $date
    ) {
      id
    }
  }
`
// published mutation
export const CREATE_PUBLISHED_MUTATION = gql`
  mutation CreatePublishedMutation(
    $id: ID!
    $published: Boolean!
  
  ) {
    publishedEvent(
      id: $id
      published: $published
    ) {
      id
    }
  }
`

export const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateMutation(
    $id: ID!
    $description: String!
    $title: String
    $photo: Upload
    $published: Boolean
    $date: String!
  ) {
    updateEvent(
      id: $id
      description: $description
      title: $title
      photo: $photo
      published: $published
      date: $date
    ) {
      id
    }
  }
`
