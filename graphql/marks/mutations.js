import gql from 'graphql-tag'
import { MARK_FIELDS_FRAGMENT } from './fragments'

export const CREATE_ROW_MUTATION = gql`
  mutation UpdateMarkMutation($marks: [MarkInput]) {
    createRow(marks: $MarkInput) {
      ...MarkFields
    }
  }
  ${MARK_FIELDS_FRAGMENT}
`