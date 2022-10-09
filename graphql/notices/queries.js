import gql from 'graphql-tag'

import { NOTICE_FIELDS_FRAGMENT } from './fragments'

export const NOTICE_QUERIES = gql`
  query NoticesWorkspaceQuery($workspaceId: Int!) {
    notices(workspaceId: $workspaceId) {
      ...NoticeFields
    }
  }
  ${NOTICE_FIELDS_FRAGMENT}
`
export const SCHOOL_NOTICE_QUERIES = gql`
  query SchoolNoticesWorkspaceQuery($workspaceId: Int!) {
    schoolNotices(workspaceId: $workspaceId) {
      ...NoticeFields
    }
  }
  ${NOTICE_FIELDS_FRAGMENT}
`
