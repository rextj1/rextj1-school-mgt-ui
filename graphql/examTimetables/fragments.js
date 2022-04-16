import gql from 'graphql-tag'
import { MYCLASSES_FIELDS_FRAGMENT } from '~/graphql/klases/fragments'

export const EXAM_TIMETABLE_FIELDS_FRAGMENT = gql`
  fragment ExamTimetableFields on Event {
    id
    slug
    subject
    term
    monday
    tuesday
    wednesday
    thursday
    friday
    time
    date
    my_class {
      ...MyclassesFields
    }
  }
  ${MYCLASSES_FIELDS_FRAGMENT}
`
