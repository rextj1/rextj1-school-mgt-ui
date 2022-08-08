import gql from 'graphql-tag'
import { GRADE_FIELDS_FRAGMENT } from './fragments'

export const CREATE_GRADE_MUTATION = gql`
  mutation CreateGradeMutation(
    $name: String!
    $mark_from: Int!
    $mark_to: Int!
    $remark: String!
    $workspace_id: Int!
  ) {
    createGrade(
      name: $name
      mark_from: $mark_from
      mark_to: $mark_to
      remark: $remark
      workspace_id: $workspace_id
    ) {
      ...GradeFields
    }
  }
  ${GRADE_FIELDS_FRAGMENT}
`

export const UPDATE_GRADE_MUTATION = gql`
  mutation UpdateGradeMutation(
    $id: Int!
    $name: String!
    $mark_from: Int!
    $mark_to: Int!
    $remark: String!
    $workspace_id: Int!
  ) {
    updateGrade(
      id: $id
      name: $name
      mark_from: $mark_from
      mark_to: $mark_to
      remark: $remark
      workspace_id: $workspace_id
    ) {
      ...GradeFields
    }
  }
  ${GRADE_FIELDS_FRAGMENT}
`
