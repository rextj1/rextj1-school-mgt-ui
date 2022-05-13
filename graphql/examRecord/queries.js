import gql from 'graphql-tag'
import { EXAM_RECORD_FIELDS_FRAGMENT } from './fragments'

export const EXAM_RECORD_QUERIES = gql`
  query KlaseResultsQuery($klase_id: Int!, $term_id: Int!, $session_id: Int!) {
    klaseResults(
      klase_id: $klase_id
      term_id: $term_id
      session_id: $session_id
    ) {
      ...ExamRecordFields
    }
  }
  ${EXAM_RECORD_FIELDS_FRAGMENT}
`
export const EXAM_RECORDS_QUERIES = gql`
  query examRecordQuery($klase_id: Int!, $session_id: Int!) {
    examRecords(klase_id: $klase_id, session_id: $session_id) {
      ...ExamRecordFields
    }
  }
  ${EXAM_RECORD_FIELDS_FRAGMENT}
`
export const STUDENT_EXAM_RESULT_QUERIES = gql`
  query studentExamResultsQuery(
    $klase_id: Int!
    $student_id: Int!
    $term_id: Int!
    $session_id: Int!
  ) {
    studentExamResult(
      klase_id: $klase_id
      student_id: $student_id
      term_id: $term_id
      session_id: $session_id
    ) {
      ...ExamRecordFields
    }
  }
  ${EXAM_RECORD_FIELDS_FRAGMENT}
`
