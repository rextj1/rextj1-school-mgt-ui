import gql from 'graphql-tag'

export const CHANGE_USER_PASSWORD_MUTATION = gql`
  mutation ChangeUserPasswordMutation(
    $id: Int!
    $oldPassword: String!
    $password: String!
  ) {
    updateUserPassword(
      id: $id
      oldPassword: $oldPassword
      password: $password
    )
  }
`
export const OTP_PASSWORD_RESET_MUTATION = gql`
  mutation OtpPasswordReseMutationt($id: Int, $email: String) {
    otpPasswordReset(id: $id, email: $email)
  }
`

export const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOtpMutationt($otp: Int!) {
    verifyOtp(otp: $otp)
  }
`

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePasswordMutationt($email: String!, $password: String!) {
    updatePassword(email: $email, password: $password)
  }
`
