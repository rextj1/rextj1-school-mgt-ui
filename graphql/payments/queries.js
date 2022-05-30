import gql from 'graphql-tag'
import {
  PAYMENT_FIELDS_FRAGMENT,
  PAYMENT_RECORD_FIELDS_FRAGMENT,
} from './fragments'

export const PAYMENT_QUERIES = gql`
  query paymentQueries {
    payments {
      ...PaymentFields
    }
  }
  ${PAYMENT_FIELDS_FRAGMENT}
`
export const PAYMENT_QUERY = gql`
  query paymentQuery($id: ID!) {
    payment(id: $id) {
      id
      amount
    }
  }
`
export const PAYMENT_RECORD_QUERIES = gql`
  query paymentRecordQueries(
    $klase_id: Int!
    $session_id: Int!
    $term_id: Int!
  ) {
    paymentRecords(
      klase_id: $klase_id
      session_id: $session_id
      term_id: $term_id
    ) {
      ...PaymentRecordFields
    }
  }
  ${PAYMENT_RECORD_FIELDS_FRAGMENT}
`
export const PAID_PAYMENT_RECORD_QUERIES = gql`
  query paidPaymentRecordQueries(
    $klase_id: Int!
    $session_id: Int!
    $term_id: Int!
  ) {
    paidPaymentRecords(
      klase_id: $klase_id
      session_id: $session_id
      term_id: $term_id
    ) {
      ...PaymentRecordFields
    }
  }
  ${PAYMENT_RECORD_FIELDS_FRAGMENT}
`

// student query
export const STUDENT_PAYMENT_RECORD_QUERIES = gql`
  query StudentPaymentRecordQueries(
    $student_id: Int!
    $session_id: Int!
    $term_id: Int!
    $status: String!
  ) {
    studentPaymentRecords(
      klase_id: $klase_id
      session_id: $session_id
      term_id: $term_id
      status: $status
    ) {
      ...PaymentRecordFields
    }
  }
  ${PAYMENT_RECORD_FIELDS_FRAGMENT}
`