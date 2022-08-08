import gql from 'graphql-tag'
import { PACKAGE_FIELDS_FRAGMENT } from './fragments'

export const ACTIVE_PACKAGE_QUERIES = gql`
  query ActivePackageQuery($payment_method: Int!) {
    activePackages(payment_method: $payment_method) {
      ...PackageFields
    }
  }
  ${PACKAGE_FIELDS_FRAGMENT}
`
export const INACTIVE_PACKAGE_QUERIES = gql`
  query InactivePackageQuery($payment_method: Int!) {
    inactivePackages(payment_method: $payment_method) {
      ...PackageFields
    }
  }
  ${PACKAGE_FIELDS_FRAGMENT}
`
