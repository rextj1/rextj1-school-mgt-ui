import gql from 'graphql-tag'

export const PAYMENT_FIELDS_FRAGMENT = gql`
  fragment PaymentFields on Payment {
    id
    title
    amount
    ref_no
    method
    description
    term {
      id
      name
    }
    session {
      id
      name
    }
    klase {
      id
      name
    }
  }
`
export const PAYMENT_RECORD_FIELDS_FRAGMENT = gql`
  fragment PaymentRecordFields on PaymentRecord {
    id
    ref_no
    amount
    amt_paid
    balance
    status
    receipt
    title
    created_at
    student {
      id
      first_name
      last_name
      photo
      phone
    }
    term {
      id
      name
    }
    payment {
      id
      title
      description
    }
    session {
      id
      name
    }
    klase {
      id
      name
    }
  }
`
