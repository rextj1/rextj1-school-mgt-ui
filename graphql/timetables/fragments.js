import gql from 'graphql-tag'
import { MYCLASSES_FIELDS_FRAGMENT } from '~/graphql/klases/fragments'

export const TIMETABLE_FIELDS_FRAGMENT = gql`
  fragment TimetableFields on Event {
    id
    slug
    subject
    monday
    tuesday
    wednesday
    thursday
    friday
    time
    my_class {
      ...MyclassesFields
    }
  }
  ${MYCLASSES_FIELDS_FRAGMENT}
`
