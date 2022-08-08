import gql from 'graphql-tag'

export const PACKAGE_FIELDS_FRAGMENT = gql`
  fragment PackageFields on Package {
    id
    payment_method
    workspace {
      id
      name
    }
    created_at
    updated_at
  }
`
