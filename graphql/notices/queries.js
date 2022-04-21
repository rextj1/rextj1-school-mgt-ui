import gql from 'graphql-tag'

import { NOTICE_FIELDS_FRAGMENT } from './fragments'

export const NOTICE_QUERIES = gql`
  query NoticesQuery {
    notices {
      ...NoticeFields
    }
  }
  ${NOTICE_FIELDS_FRAGMENT}
`