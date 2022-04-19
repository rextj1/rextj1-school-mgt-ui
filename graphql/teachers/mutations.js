import gql from 'graphql-tag'
// import { TEACHERS_FIELDS_FRAGMENT } from './fragments'

export const CREATE_TEACHER_MUTATION = gql`
  mutation CreateTeacherMutation(
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
    createTeacher(
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

export const UPDATE_TEACHER_MUTATION = gql`
  mutation UpdateTeacherMutation(
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
    $photo: Upload
    $phone: String
    $qualification: String
    $blood_group: Int
    $religion: String
  ) {
    updateTeacher(
      id: $id
      first_name: $first_name
      last_name: $last_name
      middle_name: $middle_name
      email: $email
      phone: $phone
      gender: $gender
      photo: $photo
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
