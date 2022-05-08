import gql from 'graphql-tag'

export const MARK_FIELDS_FRAGMENT = gql`
  fragment MarkFields on Mark {
    id
    ca1
    ca2
    tca
    exam
    exam_total
    sub_position
    cum_ave
    session
    cum
    student {
      id
      first_name
      last_name
    }
    subject {
      id
      subject
    }
    klase {
      id
      name
    }
    grade {
      id
      name

      mark_from
      mark_to
      remark
    }
  }
`
