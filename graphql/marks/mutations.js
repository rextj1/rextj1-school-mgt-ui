import gql from 'graphql-tag'
import { MARK_FIELDS_FRAGMENT } from './fragments'

export const CREATE_FIELD_MUTATION = gql`
  mutation UpdateMarkMutation(
    $klase: Int!
    $subject: Int!
    $term: Int!
    $session: Int!
  ) {
    createQueries(
      klase: $klase
      subject: $subject
      term: $term
      session: $session
    ) {
      id
      ca1
      ca2
      exam
      subject {
        id
        subject
      }
    }
  }
`

export const CREATE_ROW_MUTATION = gql`
  mutation UpdateMarkMutation($marks: [MarkInput]) {
    updateMarks(marks: $marks) {
      id
    }
  }
`
