import gql from 'graphql-tag'
import {
  PAYMENT_FIELDS_FRAGMENT,
  PAYMENT_RECORD_FIELDS_FRAGMENT,
} from './fragments'

export const CREATE_PAYMENT_FIELD_MUTATION = gql`
  mutation createPaymentMutation(
    $klase: String!
    $amount: Int
    $term_id: Int!
    $session_id: Int!
  ) {
    createPayment(
      klase: $klase
      amount: $amount
      term_id: $term_id
      session_id: $session_id
    ) {
      ...PaymentFields
    }
  }
  ${PAYMENT_FIELDS_FRAGMENT}
`

export const UPDATE_PAYMENT_FIELD_MUTATION = gql`
  mutation updatePaymentMutation($id: ID!, $amount: Int) {
    updatePayment(id: $id, amount: $amount) {
      ...PaymentFields
    }
  }
  ${PAYMENT_FIELDS_FRAGMENT}
`

export const CREATE_PAYMENT_RECORD_MUTATION = gql`
  mutation createPaymentRecordsMutation($id: ID!, $amt_paid: Int!) {
    createPaymentRecord(id: $id, amt_paid: $amt_paid) {
      ...PaymentRecordFields
    }
  }
  ${PAYMENT_RECORD_FIELDS_FRAGMENT}
`
export const RESET_PAYMENT_RECORD_MUTATION = gql`
  mutation resetPaymentRecordsMutation($id: ID!) {
    resetPaymentRecord(id: $id) {
      ...PaymentRecordFields
    }
  }
  ${PAYMENT_RECORD_FIELDS_FRAGMENT}
`

// student Payment
export const CREATE_STUDENT_PAYMENT_MUTATION = gql`
  mutation createStudentPaymentMutation(
    $student_id: Int!
    $term_id: Int!
    $session_id: Int!
    $amt_paid: Int!
  ) {
    CreateStudentPayment(
      student_id: $student_id
      term_id: $term_id
      session_id: $session_id
      amt_paid: $amt_paid
    ) {
      ...PaymentRecordFields
    }
  }
  ${PAYMENT_RECORD_FIELDS_FRAGMENT}
`
