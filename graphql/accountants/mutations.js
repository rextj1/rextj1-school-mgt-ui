import gql from 'graphql-tag'
import { ACCOUNTANT_FIELDS_FRAGMENT } from './fragments'

export const CREATE_ACCOUNTANT_MUTATION = gql`
  mutation CreateAccountantMutation(
    $workspaceId: Int
    $userTable: UsersInput
    $accountantTable: WorkersInput
  ) {
    createAccountant(
      workspaceId: $workspaceId
      userTable: $userTable
      accountantTable: $accountantTable
    ) {
      id
    }
  }
`

export const UPDATE_ACCOUNTANT_MUTATION = gql`
  mutation UpdateAccountantMutation(
    $id: ID!
    $workspaceId: Int
    $userTable: EditUsersInput
    $accountantTable: WorkersInput
  ) {
    updateAccountant(
      id: $id
      workspaceId: $workspaceId
      userTable: $userTable
      accountantTable: $accountantTable
    ) {
      ...AccountantFields
    }
  }
  ${ACCOUNTANT_FIELDS_FRAGMENT}
`
export const DELETE_ACCOUNTANT_MUTATION = gql`
  mutation DeleteAccountantMutation($id: Int!, $workspaceId: Int) {
    deleteAccountant(id: $id, workspaceId: $workspaceId)
  }
`
