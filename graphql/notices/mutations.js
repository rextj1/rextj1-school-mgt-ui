import gql from 'graphql-tag'

export const CREATE_NOTICE_MUTATION = gql`
  mutation CreateMutation(
    $description: String!
    $title: String
    $photo: Upload
    $date: String!
  ) {
    createNotice(
      description: $description
      title: $title
      photo: $photo
      date: $date
    ) {
      id
    }
  }
`

export const UPDATE_NOTICE_MUTATION = gql`
  mutation UpdateMutation(
    $id: ID!
    $description: String
    $title: String
    $photo: Upload
    $published: Boolean
    $date: String
  ) {
    updateNotice(
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
export const CREATE_ROW_MUTATION = gql`
  mutation UpdatexMutation($description: [ObjectT]) {
    createRow(description: $description) {
      id
    }
  }
`