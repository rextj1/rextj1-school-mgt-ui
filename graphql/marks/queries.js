import gql from 'graphql-tag'
import { MARK_FIELDS_FRAGMENT } from './fragments'

export const MARK_QUERIES = gql`
  query MarksQuery($klase_id: Int!, $subject_id: Int!, $session: Int!) {
    marks(klase_id: $klase_id, subject_id: $subject_id, session: $session) {
      ...MarkFields
    }
  }
  ${MARK_FIELDS_FRAGMENT}
`
export const TERM_QUERIES = gql`
  query TermsQuery {
    terms {
      id
      name
    }
  }
`

export const SESSION_QUERIES = gql`
  query SessionsQuery {
    sessions {
      id
      name
    }
  }
`
