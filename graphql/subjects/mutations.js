import gql from 'graphql-tag'

export const CREATE_SUBJECT_MUTATION = gql`
  mutation CreateSubjectMutation($subject: String!) {
    createSubject(subject: $subject) {
      id
      subject
    }
  }
`

export const UPDATE_SUBJECT_MUTATION = gql`
  mutation UpdateSubjectMutation($id: ID!, $subject: String!) {
    updateSubject(id: $id, subject: $subject) {
      id
      subject
    }
  }
`
export const DELETE_SUBJECT_MUTATION = gql`
  mutation DeleteSubjectMutation($id: ID!) {
    deleteSubject(id: $id) {
      id
      subject
    }
  }
`
