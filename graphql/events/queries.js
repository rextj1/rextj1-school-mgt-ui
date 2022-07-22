import gql from 'graphql-tag'

import { EVENT_FIELDS_FRAGMENT } from './fragments'

// export const NOTICE_QUERIES = gql`
//   query NoticesQuery {
//     notices {
//       ...NoticeFields
//     }
//   }
//   ${NOTICE_FIELDS_FRAGMENT}
// `
export const EVENT_QUERIES = gql`
  query EventsWorkspaceQuery($slug: String) {
    events(slug: $slug) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS_FRAGMENT}
`