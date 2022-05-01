import gql from 'graphql-tag'
import { KLASE_FIELDS_FRAGMENT } from '~/graphql/klases/fragments'
import { SINGLE_TIMETABLE_FIELDS_FRAGMENT } from '../timetables/fragments'
import { UXER_FIELDS_FRAGMENT } from '../users/fragments'

export const STUDENT_FIELDS_FRAGMENT = gql`
  fragment StudentFields on Student {
    id
    slug
    first_name
    last_name
    middle_name
    phone
    gender
    photo
    adm_no
    code
    status
    address
    admitted_year
    guardian_name
    guardian_no
    guardian_email
    guardian_address
    term
    session
    # guardian: Guardian @belongsTo
    # klase: Klase @belongsTo
    # user: User @belongsTo
    # subject: [Subject] @hasMany
    # timetable: Timetable @belongsTo
    # exam_timetable: ExamTimetable @belongsTo

    guardian {
      id
      slug
    }
    klase {
      ...KlaseFields
    }
    # timetable {
    #   ...SingleTimetableFields
    # }
    user {
      id
      lga
      religion
      email
      blood_group {
        id
        name
      }
      country {
        id
        name
      }
      state {
        id
        name
      }
      city {
        id
        name
      }
    }
  }

  ${KLASE_FIELDS_FRAGMENT}
`
export const SINGLE_STUDENT_FIELD_FRAGMENT = gql`
  fragment SingleStudentField on Student {
    id
    slug
    first_name
    last_name
    middle_name
    phone
    gender
    photo
    adm_no
    code
    status
    address
    admitted_year
    guardian_name
    guardian_no
    guardian_email
    guardian_address
    term
    session
  }
`
