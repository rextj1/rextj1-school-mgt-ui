import gql from 'graphql-tag'
import { SUBJECTS_FIELDS_FRAGMENT } from '@/graphql/subjects/fragments'

export const KLASE_FIELDS_FRAGMENT = gql`
  fragment KlaseFields on Klase {
    id
    slug
    name
    subjects {
      ...SubjectsFields
    }
  }
  ${SUBJECTS_FIELDS_FRAGMENT}
`