import gql from 'graphql-tag'
import { NOTICE_FIELDS_FRAGMENT } from './fragments'

export const CREATE_NOTICE_MUTATION = gql`
  mutation CreateMutation(
    $description: String!
    $title: String
    $photo: Upload
    $date: String!
    $workspace: String
  ) {
    createNotice(
      description: $description
      title: $title
      photo: $photo
      date: $date
      workspace: $workspace
    ) {
      ...NoticeFields
    }
  }
  ${NOTICE_FIELDS_FRAGMENT}
`

export const UPDATE_NOTICE_MUTATION = gql`
  mutation UpdateMutation(
    $id: ID!
    $description: String!
    $title: String
    $photo: Upload
    $date: String!
    $workspace: String
  ) {
    updateNotice(
      id: $id
      description: $description
      title: $title
      photo: $photo
      date: $date
      workspace: $workspace
    ) {
      ...NoticeFields
    }
  }
  ${NOTICE_FIELDS_FRAGMENT}
`

export const DELETE_NOTICE_MUTATION = gql`
  mutation DeleteNoticeMutation($workspace: String!, $id: Int!) {
    deleteNotice(workspace: $workspace, id: $id){
      id
    }
  }
`
export const PUBLISH_NOTICE_MUTATION = gql`
  mutation PublishNoticeMutation($workspace: String!, $id: Int!) {
    publishNotice(workspace: $workspace, id: $id){
      id
      published
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
