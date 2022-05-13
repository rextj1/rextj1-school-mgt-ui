import gql from 'graphql-tag'

export const EXAM_RECORD_FIELDS_FRAGMENT = gql`
  fragment ExamRecordFields on ExamRecord {
    id
    total
    avg
    position
    p_comment
    t_comment
    term {
      id
      name
    }
    session {
      id
      name
    }
    student {
      id
      first_name
      last_name
      adm_no
      photo
      birthday
    }
    subject {
      id
      subject
    }
    klase {
      id
      name
    }
  }
`
