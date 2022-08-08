import gql from 'graphql-tag'

import { GRADE_FIELDS_FRAGMENT } from './fragments'

export const GRADE_QUERIES = gql`
  query GradesQuery($workspaceId: Int!) {
    grades(workspaceId: $workspaceId) {
      ...GradeFields
    }
  }
  ${GRADE_FIELDS_FRAGMENT}
`
export const GRADE_QUERY = gql`
  query GradeQuery($id: Int!, $workspaceId: Int!) {
    grade(id: $id, workspaceId: $workspaceId) {
      ...GradeFields
    }
  }
  ${GRADE_FIELDS_FRAGMENT}
`
