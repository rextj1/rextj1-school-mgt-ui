import gql from 'graphql-tag'

export const DRIVER_FIELDS_FRAGMENT = gql`
  fragment DriverFields on Driver {
    id
    slug
    first_name
    last_name
    birthday
    route
    driver_license
    vehicle_number
    religion
    phone
    photo
    lga
    blood_group {
      id
      name
    }
    country {
      id
      name
    }
    state {
      id
      name
    }
    city {
      id
      name
    }
  }
`
