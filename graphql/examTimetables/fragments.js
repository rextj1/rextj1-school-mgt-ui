import gql from 'graphql-tag'

export const EXAM_TIMETABLE_FIELDS_FRAGMENT = gql`
  fragment ExamTimetableFields on ExamTimetable {
    id
    monday
    tuesday
    wednesday
    thursday
    friday
    time
    date
    klase {
      id
      slug
      name
    }
    section{
      id
      name
    }
  }
`

export const SINGLE_EXAM_TIMETABLE_FIELDS_FRAGMENT = gql`
  fragment SingleExamTimetableFields on ExamTimetable {
    id
    monday
    tuesday
    wednesday
    thursday
    friday
    time
    date
  }
`
