import gql from 'graphql-tag'
import { NOTICE_FIELDS_FRAGMENT } from './fragments'

export const CREATE_NOTICE_MUTATION = gql`
  mutation CreateMutation(
    $description: String
    $date: String
    $workspaceId: Int!
  ) {
    createNotice(
      description: $description
      date: $date
      workspaceId: $workspaceId
    ) {
      ...NoticeFields
    }
  }
  ${NOTICE_FIELDS_FRAGMENT}
`

export const UPDATE_NOTICE_MUTATION = gql`
  mutation UpdateMutation(
    $id: ID!
    $description: String
    $date: String
    $workspaceId: Int!
  ) {
    updateNotice(
      id: $id
      description: $description
      date: $date
      workspaceId: $workspaceId
    ) {
      ...NoticeFields
    }
  }
  ${NOTICE_FIELDS_FRAGMENT}
`

export const DELETE_NOTICE_MUTATION = gql`
  mutation DeleteNoticeMutation($workspaceId: Int!, $id: Int!) {
    deleteNotice(workspaceId: $workspaceId, id: $id) {
      id
    }
  }
`
export const PUBLISH_NOTICE_MUTATION = gql`
  mutation PublishNoticeMutation($workspaceId: Int!, $id: Int!) {
    publishNotice(workspaceId: $workspaceId, id: $id) {
      id
      status
    }
  }
`

export const BULK_DELETE_NOTICE_MUTATION = gql`
  mutation BulkDeleteNoticeMutation($workspaceId: Int!, $ids: [String!]) {
    bulkDeleteNotice(workspaceId: $workspaceId, ids: $ids)
  }
`
