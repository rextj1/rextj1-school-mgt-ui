import gql from 'graphql-tag'
import { STUDENT_FIELDS_FRAGMENT } from '@/graphql/students/fragments'

export const GUARDIANS_FIELDS_FRAGMENT = gql`
  fragment GuardiansFields on Guardian {
    id
    slug
    student {
      ...StudentFields
    }
  }
  ${STUDENT_FIELDS_FRAGMENT}
`

