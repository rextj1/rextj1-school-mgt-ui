import gql from 'graphql-tag'
import { MARK_FIELDS_FRAGMENT } from './fragments'

export const CREATE_FIELD_MUTATION = gql`
  mutation UpdateMarkMutation(
    $klase: Int!
    $subject: Int!
    $term: Int!
    $session: Int!
    $section: Int!
  ) {
    createQueries(
      klase: $klase
      subject: $subject
      term: $term
      session: $session
      section: $section
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
  mutation UpdateMarkMutation(
    $marks: [MarkInput]
    $klase_id: Int!
    $subject_id: Int!
    $term_id: Int!
    $session_id: Int!
    $section_id: Int!
  ) {
    updateMarks(
      marks: $marks
      klase_id: $klase_id
      subject_id: $subject_id
      term_id: $term_id
      session_id: $session_id
      section_id: $section_id
    ) {
      id
    }
  }
`
export const CREATE_SESSION_MUTATION = gql`
  mutation createSessionMutation($name: String!) {
    createSession(name: $name) {
      id
      name
    }
  }
`
export const UPDATE_SESSION_MUTATION = gql`
  mutation updateSessionMutation($id: ID!, $name: String!) {
    updateSession(id: $id, name: $name) {
      id
      name
    }
  }
`
