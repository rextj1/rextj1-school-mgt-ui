import gql from 'graphql-tag'

export const CREATE_DRIVER_MUTATION = gql`
  mutation CreateDriverMutation(
    $first_name: String
    $last_name: String
    $religion: String
    $route: String
    $driver_license: String
    $vehicle_number: String
    $phone: String!
    $country: Int!
    $state: Int!
    $city: Int!
    $lga: String
    $blood_group: Int
  ) {
    createDriver(
      first_name: $first_name
      last_name: $last_name
      religion: $religion
      route: $route
      driver_license: $driver_license
      vehicle_number: $vehicle_number
      phone: $phone
      country: $country
      state: $state
      city: $city
      lga: $lga
      blood_group: $blood_group
    ) {
      id
    }
  }
`

export const UPDATE_DRIVER_MUTATION = gql`
  mutation UpdateDriverMutation(
    $id: ID!
    $first_name: String
    $last_name: String
    $religion: String
    $route: String
    $driver_license: String
    $vehicle_number: String
    $phone: String!
    $country: Int!
    $state: Int!
    $city: Int!
    $lga: String
    $blood_group: Int
  ) {
    updateDriver(
      id: $id
      first_name: $first_name
      last_name: $last_name
      religion: $religion
      route: $route
      driver_license: $driver_license
      vehicle_number: $vehicle_number
      phone: $phone
      country: $country
      state: $state
      city: $city
      lga: $lga
      blood_group: $blood_group
    ) {
      id
    }
  }
`
