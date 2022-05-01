import gql from 'graphql-tag'
// import { TEACHERS_FIELDS_FRAGMENT } from './fragments'

export const CREATE_STUDENT_MUTATION = gql`
  mutation CreateStudentMutation(
     $first_name: String!
        $last_name: String!
        $gender: String!
        $country: Int!
        $state: Int!
        $city: Int!
        $middle_name: String
        $email: String!
        $klase: Int
        $phone: String 
        $photo: Upload
        $guardian_name: String
        $guardian_no: String
        $guardian_email: String
        $guardian_address: String
        $blood_group: Int
        $lga: String
        $religion: String
  ) {
    createStudent(
      first_name: $first_name
        last_name: $last_name
        gender: $gender
        country: $country
        state: $state
        city: $city
        middle_name: $middle_name
        email: $email
        klase: $klase
        phone: $phone 
        photo: $photo
        guardian_name: $guardian_name
        guardian_no: $guardian_no
        guardian_email: $guardian_email
        guardian_address: $guardian_address
        blood_group: $blood_group
        lga: $lga
        religion: $religion
    ) {
      id
    }
  }
`

export const UPDATE_STUDENT_MUTATION = gql`
  mutation UpdateStudentMutation(
    $id: ID!
    $first_name: String!
    $last_name: String!
    $gender: String!
    $country: Int!
    $state: Int!
    $city: Int!
    $middle_name: String
    $email: String!
    $klase: Int
    $phone: String
    $photo: Upload
    $guardian_name: String
    $guardian_no: String
    $guardian_email: String
    $guardian_address: String
    $blood_group: Int
    $lga: String
    $religion: String
  ) {
    updateStudent(
      id: $id
      first_name: $first_name
      last_name: $last_name
      gender: $gender
      country: $country
      state: $state
      city: $city
      middle_name: $middle_name
      email: $email
      klase: $klase
      phone: $phone
      photo: $photo
      guardian_name: $guardian_name
      guardian_no: $guardian_no
      guardian_email: $guardian_email
      guardian_address: $guardian_address
      blood_group: $blood_group
      lga: $lga
      religion: $religion
    ) {
      id
    }
  }
`
