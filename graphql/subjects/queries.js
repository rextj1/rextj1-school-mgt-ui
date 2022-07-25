import gql from 'graphql-tag'

import { SINGLE_SUBJECTS_FIELDS_FRAGMENT } from './fragments'

export const SUBJECT_QUERIES = gql`
  query subjectsQuery($workspaceId: Int) {
    subjects(workspaceId: $workspaceId) {
      ...SingleSubjectsFields
      teachers {
        id
        first_name
        last_name
        slug
      }
    }
  }
  ${SINGLE_SUBJECTS_FIELDS_FRAGMENT}
`
export const SUBJECT_QUERY = gql`
  query subjectQuey($id: ID!, $workspaceId: Int) {
    subject(id: $id, workspaceId: $workspaceId) {
      ...SingleSubjectsFields
    }
  }
  ${SINGLE_SUBJECTS_FIELDS_FRAGMENT}
`
export const SUBJECTS_QUERIES = gql`
  query subjectsQueries($workspaceId: Int) {
    subjects(workspaceId: $workspaceId) {
      id
      subject
    }
  }
`
