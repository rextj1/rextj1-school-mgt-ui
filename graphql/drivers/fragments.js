import gql from 'graphql-tag'

export const DRIVER_FIELDS_FRAGMENT = gql`
  fragment DriverFields on Driver {
    id
    slug
    first_name
    last_name
    route
    driver_license
    vehicle_number
    blood_group
  }

`