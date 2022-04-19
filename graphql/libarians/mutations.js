import gql from 'graphql-tag'

export const CREATE_LIBARIAN_MUTATION = gql`
  mutation CreateLibarianMutation(
    $first_name: String!
    $last_name: String!
    $gender: String!
    $email: String!
    $country: Int!
    $state: Int!
    $city: Int!
    $lga: String
    $middle_name: String
    $photo: Upload
    $phone: String
    $facebook: String
    $qualification: String
    $blood_group: Int
    $religion: String
  ) {
    createLibarian(
      first_name: $first_name
      last_name: $last_name
      middle_name: $middle_name
      email: $email
      phone: $phone
      gender: $gender
      photo: $photo
      facebook: $facebook
      qualification: $qualification
      blood_group: $blood_group
      country: $country
      state: $state
      city: $city
      lga: $lga
      religion: $religion
    ) {
      id
    }
  }
`

export const UPDATE_LIBARIAN_MUTATION = gql`
  mutation UpdateLibarianMutation(
    $id: ID!
    $first_name: String!
    $last_name: String!
    $gender: String!
    $email: String!
    $country: Int!
    $state: Int!
    $city: Int!
    $lga: String
    $middle_name: String
    # $photo: Upload
    $phone: String
    $facebook: String
    $qualification: String
    $blood_group: Int
    $religion: String
  ) {
    updateLibarian(
      id: $id
      choices: {
        first_name: $first_name
        last_name: $last_name
        middle_name: $middle_name
        email: $email
        phone: $phone
        gender: $gender
        # photo: $photo
        facebook: $facebook
        qualification: $qualification
        blood_group: $blood_group
        country: $country
        state: $state
        city: $city
        lga: $lga
        religion: $religion
      }
    ) {
      id
    }
  }
`