import gql from 'graphql-tag'
import { MYCLASSES_FIELDS_FRAGMENT } from '~/graphql/klases/fragments'

export const PAYMENT_FIELDS_FRAGMENT = gql`
  fragment PaymentFields on Payment {
    id
    slug
    ref_no
    description
    expense_type
    method
    amount
    session
    my_class {
      ...MyclassesFields
    }
  }
  ${MYCLASSES_FIELDS_FRAGMENT}
`
export const INCOMPLETE_FIELDS_FRAGMENT = gql`
  fragment IncompletePaymentFields on IncompletePayment {
    id
    slug
    ref_no
    description
    expense_type
    method
    amount
    session
    my_class {
      ...MyclassesFields
    }
  }
  ${MYCLASSES_FIELDS_FRAGMENT}
`