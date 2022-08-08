import gql from 'graphql-tag'
import { UXER_FIELDS_FRAGMENT } from '../users/fragments'

export const CREATE_WORKSPACE_MUTATION = gql`
  mutation AdmninWorkspaceMutation(
    $workspaceId: Int
    $logo: String
    $stamp: String
    $status: Int
    $paystack_secret_key: String
  ) {
    createAdmin(
      workspaceId: $workspaceId
      logo: $logo
      stamp: $stamp
      status: $status
      paystack_secret_key: $paystack_secret_key
    ) {
      id
      logo
      stamp
      status
      paystack_secret_key
    }
  }
`
export const UPDATE_WORKSPACE_MUTATION = gql`
  mutation UpdateWorkspaceMutation(
    $id: Int!
    $workspaceId: Int
    $logo: String
    $stamp: String
    $status: Int
    $paystack_secret_key: String
  ) {
    updateAdmin(
      id: $id
      workspaceId: $workspaceId
      logo: $logo
      stamp: $stamp
      status: $status
      paystack_secret_key: $paystack_secret_key
    ) {
      id
      logo
      stamp
      email
      status
      paystack_secret_key
    }
  }
`

export const CREATE_SCHOOL_MUTATION = gql`
  mutation CreateSchoolMutation(
    $name: String!
    $slug: String!
    $email: String!
    $phone: Int!
    $first_name: String!
    $last_name: String!
    $lga: String
    $country: Int!
    $state: Int!
    $city: Int!
  ) {
    createSchool(
      name: $name
      slug: $slug
      email: $email
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
    $phone: Int!
    $first_name: String!
    $last_name: String!
    $lga: String
    $country: Int!
    $state: Int!
    $city: Int!
  ) {
    updateSchool(
      id: $id
      name: $name
      slug: $slug
      email: $email
      phone: $phone
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
