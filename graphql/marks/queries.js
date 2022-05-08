import gql from 'graphql-tag'
import { MARK_FIELDS_FRAGMENT } from './fragments'

export const MARK_QUERIES = gql`
  query MarksQuery($klase_id: Int!,$subject_id: Int!) {
    marks(klase_id: $klase_id, subject_id: $subject_id) {
      ...MarkFields
    }
  }
  ${MARK_FIELDS_FRAGMENT}
`
