import gql from 'graphql-tag'

export const EXAM_RECORD_FIELDS_FRAGMENT = gql`
  fragment ExamRecordFields on ExamRecord {
    id
    total
    avg
    cum_total
    cum_avg
    position
    cum_position
    p_comment
    t_comment
    ps
    num_present
    num_absent
    num_total
    term_start
    term_end
    promoted_to
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
      middle_name
      adm_no
      gender
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
