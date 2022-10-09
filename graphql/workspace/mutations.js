import gql from 'graphql-tag'
import { UXER_FIELDS_FRAGMENT } from '../users/fragments'

export const CREATE_SCHOOL_MUTATION = gql`
  mutation CreateSchoolMutation(
    $name: String!
    $slug: String!
    $email: String!
    $phone: String!
    $gender: String!
    $first_name: String!
    $last_name: String!
    $lga: String
    $country: Int!
    $state: Int!
    $city: String!
  ) {
    createSchool(
      name: $name
      slug: $slug
      email: $email
      gender: $gender
      phone: $phone
      first_name: $first_name
      last_name: $last_name
      lga: $lga
      country: $country
      state: $state
      city: $city
    )
  }
`
export const UPDATE_SCHOOL_MUTATION = gql`
  mutation UpdateSchoolMutation(
    $id: Int!
    $name: String!
    $slug: String!
    $email: String!
    $phone: String!
    $gender: String!
    $first_name: String!
    $last_name: String!
    $lga: String
    $country: Int!
    $state: Int!
    $city: String!
  ) {
    updateSchool(
      id: $id
      name: $name
      slug: $slug
      email: $email
      phone: $phone
      gender: $gender
      first_name: $first_name
      last_name: $last_name
      lga: $lga
      country: $country
      state: $state
      city: $city
    ) {
      id
      name
      slug
      email
      status
      gender
      user {
        ...UxerFields
      }
    }
  }
  ${UXER_FIELDS_FRAGMENT}
`

export const DELETE_SCHOOL_MUTATION = gql`
  mutation deleteSchoolMutation($workspaceId: Int!) {
    deleteSchool(workspaceId: $workspaceId)
  }
`
export const UPDATE_SETTING_ADMIN_MUTATION = gql`
  mutation UpdateSettingsMutation(
    $workspaceId: ID!
    $logo: Upload
    $stamp: Upload
    $bank: String
    $account_name: String
    $account_no: String
    $paystack_secret_key: String
  ) {
    updateAdminSettings(
      workspaceId: $workspaceId
      logo: $logo
      stamp: $stamp
      bank: $bank
      account_name: $account_name
      account_no: $account_no
      paystack_secret_key: $paystack_secret_key
    ) {
      id
      logo
      stamp
      bank
      account_name
      account_no
      paystack_secret_key
    }
  }
`
export const SUSPEND_SCHOOL_MUTATION = gql`
  mutation SuspendSchoolMutation($workspaceId: ID!, $status: Int!) {
    SuspendSchool(workspaceId: $workspaceId, status: $status) {
      id
      logo
      stamp
      email
      status
      paystack_secret_key
    }
  }
`
