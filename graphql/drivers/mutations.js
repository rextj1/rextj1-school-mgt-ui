import gql from 'graphql-tag'

export const CREATE_DRIVER_MUTATION = gql`
  mutation CreateDriverMutation(
    $first_name: String
    $last_name: String
    $religion: String
    $route: String
    $photo: Upload
    $birthday: String
    $gender: String
    $driver_license: String
    $vehicle_number: String
    $phone: String
    $country_id: Int
    $state_id: Int
    $city_id: Int
    $lga: String
    $blood_group_id: Int
  ) {
    createDriver(
      first_name: $first_name
      last_name: $last_name
      religion: $religion
      route: $route
      photo: $photo
      gender: $gender
      birthday: $birthday
      driver_license: $driver_license
      vehicle_number: $vehicle_number
      phone: $phone
      country_id: $country_id
      state_id: $state_id
      city_id: $city_id
      lga: $lga
      blood_group_id: $blood_group_id
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
    $birthday: String
    $route: String
    $photo: Upload
    $gender: String
    $driver_license: String
    $vehicle_number: String
    $phone: String!
    $country_id: Int!
    $state_id: Int!
    $city_id: Int!
    $lga: String
    # $blood_group_id: Int
  ) {
    updateDriver(
      id: $id
      first_name: $first_name
      last_name: $last_name
      religion: $religion
      birthday: $birthday
      route: $route
      photo: $photo
      gender: $gender
      driver_license: $driver_license
      vehicle_number: $vehicle_number
      phone: $phone
      country_id: $country_id
      state_id: $state_id
      city_id: $city_id
      lga: $lga
      # blood_group_id: $blood_group_id
    ) {
      first_name
      last_name
      religion
      birthday
      route
      photo
      driver_license
      # vehicle_number
      # phone
    }
  }
`
export const DELETE_DRIVER_MUTATION = gql`
  mutation DeleteDriverMutation(
    $id: ID!
  ) {
    deleteDriver(
      id: $id
    ) {
      id
    }
  }
`
