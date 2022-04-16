import gql from 'graphql-tag'
import { ACCOUNTANT_FIELDS_FRAGMENT } from '@/graphql/accountants/fragments'
import { LIBARIAN_FIELDS_FRAGMENT } from '@/graphql/libarians/fragments'
import { TEACHER_FIELDS_FRAGMENT } from '@/graphql/teachers/fragments'
import { DRIVER_FIELDS_FRAGMENT } from '@/graphql/drivers/fragments'

export const STAFF_FIELDS_FRAGMENT = gql`
  fragment StaffFields on Staff {
    id
    slug
    full_name
    job_title
    status
    email
    phone_no
    address
    employment_date
    photo
    qualification
    accountant {
      ...AccountantFields
    }
    libarian {
      ...LibarianFields
    }
    teacher {
      ...TeacherFields
    }
    driver {
      ...DriverFields
    }
  }
  ${(ACCOUNTANT_FIELDS_FRAGMENT,
  LIBARIAN_FIELDS_FRAGMENT,
  TEACHER_FIELDS_FRAGMENT,
  DRIVER_FIELDS_FRAGMENT)}
`
