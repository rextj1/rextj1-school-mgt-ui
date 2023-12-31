import gql from 'graphql-tag'
import { KLASE_FIELDS_FRAGMENT } from '~/graphql/klases/fragments'

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
    cum_avg
    promotion_term_id
    status
    address
    admitted_year
    guardian_name
    guardian_no
    guardian_email
    guardian_address
    term {
      id
      name
    }
    section {
      id
      name
    }
    session {
      id
      name
    }
    birthday

    guardian {
      id
      slug
      user{
        id
        photo
      }
    }
    klase {
      ...KlaseFields
    }
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
      city
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
    gender
    code
    cum_avg
    status
    address
    admitted_year
    guardian_name
    guardian_no
    guardian_email
    guardian_address
    term {
      id
      name
    }
    session {
      id
      name
    }
    section {
      id
      name
    }
    birthday
    klase {
      id
      name
    }
  }
`

export const MARK_STUDENT_FIELD_FRAGMENT = gql`
  fragment MarkSingleStudentField on Student {
    id
  }
`
