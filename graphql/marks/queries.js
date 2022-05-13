import gql from 'graphql-tag'
import { MARK_FIELDS_FRAGMENT } from './fragments'

export const MARK_QUERIES = gql`
  query MarksQuery(
    $klase_id: Int!
    $subject_id: Int!
    $term_id: Int!
    $session_id: Int!
  ) {
    marks(
      klase_id: $klase_id
      subject_id: $subject_id
      term_id: $term_id
      session_id: $session_id
    ) {
      ...MarkFields
    }
  }
  ${MARK_FIELDS_FRAGMENT}
`

export const STUDENT_MARK_RESULT_QUERIES = gql`
  query studentMarkResultsQuery(
    $klase_id: Int!
    $student_id: Int!
    $term_id: Int!
    $session_id: Int!
  ) {
    studentMarkResult(
      klase_id: $klase_id
      student_id: $student_id
      term_id: $term_id
      session_id: $session_id
    ) {
      ...MarkFields
    }
  }
  ${MARK_FIELDS_FRAGMENT}
`

// export const KLASE_RESULT_QUERY = gql`
//   query klaseResulxtQuery($klase_id: Int!, $term_id: Int!, $session_id: Int!) {
//     klaseResult(
//       klase_id: $klase_id
//       term_id: $term_id
//       session_id: $session_id
//     ) {
//       ...MarkFields
//     }
//   }
//   ${MARK_FIELDS_FRAGMENT}
// `

export const SESSION_QUERIES = gql`
  query SessionsQuery {
    sessions {
      id
      name
    }
  }
`
export const TERM_QUERIES = gql`
  query TermsQuery {
    terms {
      id
      name
    }
  }
`
