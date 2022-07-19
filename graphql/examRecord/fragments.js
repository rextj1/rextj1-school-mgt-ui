import gql from 'graphql-tag'

export const EXAM_RECORD_FIELDS_FRAGMENT = gql`
  fragment ExamRecordFields on ExamRecord {
    id
    total
    avg
    cum_total
    cum_avg
    position
    p_comment
    t_comment
    ps
    term {
      id
      name
    }
    section {
      id
      name
    }
    status
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
