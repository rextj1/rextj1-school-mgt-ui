import gql from 'graphql-tag'

export const CREATE_CREATE_MUTATION = gql`
  mutation CreateSubjectMutation(
    $subject: String!
    $klase: Int
    $student: Int
  ) {
    createSubject(
      subject: $subject
      klase: $klase
      student: $Int
    ) {
      id
    }
  }
`

export const UPDATE_SUBJECT_MUTATION = gql`
  mutation UpdateSubjectMutation(
    $id: ID!
    $subject: String!
    $klase: Int
    $student: Int
  ) {
    updateSubject(id: $id, subject: $subject, klase: $klase, student: $Int) {
      id
    }
  }
`
