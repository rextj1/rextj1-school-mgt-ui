import gql from 'graphql-tag' 

export const SUBJECTS_FIELDS_FRAGMENT = gql`
  fragment SubjectsFields on Subject {
    id
    slug
    subject
  }
`
