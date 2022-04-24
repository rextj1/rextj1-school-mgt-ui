import gql from 'graphql-tag'

export const TIMETABLE_FIELDS_FRAGMENT = gql`
  fragment TimetableFields on Timetable {
    id
    monday
    tuesday
    wednesday
    thursday
    friday
    time
    klase {
      id
      slug
      name
    }
  }
`

export const SINGLE_TIMETABLE_FIELDS_FRAGMENT = gql`
  fragment SingleTimetableFields on Timetable {
    id
    monday
    tuesday
    wednesday
    thursday
    friday
    time
  }
`
