import gql from 'graphql-tag'

import { SINGLE_SUBJECTS_FIELDS_FRAGMENT } from './fragments'

export const SUBJECT_QUERIES = gql`
  query subjectsQuery {
    subjects {
      ...SingleSubjectsFields
    }
  }
  ${SINGLE_SUBJECTS_FIELDS_FRAGMENT}
`
export const SUBJECT_QUERY = gql`
  query subjectQuey($id: ID!) {
    subject(id: $id) {
      ...SingleSubjectsFields
    }
  }
  ${SINGLE_SUBJECTS_FIELDS_FRAGMENT}
`
