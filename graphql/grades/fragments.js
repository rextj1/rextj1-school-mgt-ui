import gql from 'graphql-tag'

export const GRADE_FIELDS_FRAGMENT = gql`
  fragment GradeFields on Grade {
    id
    name
    mark_from
    mark_to
    remark
  }
`
