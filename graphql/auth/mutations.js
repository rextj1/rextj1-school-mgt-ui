// import gql from 'graphql-tag'
// import { USER_FIELDS_FRAGMENT } from '~/graphql/users/fragments'

// export const LOGIN_MUTATION = gql`
//   mutation LoginMutation($email: String!, $password: String!) {
//     logIn(email: $email, password: $password) {
//       token
//       expires_in
//     }
//   }
// `

// export const LOGOUT_MUTATION = gql`
//   mutation LogoutMutation {
//     logout
//   }
// `

// export const SIGNUP_MUTATION = gql`
//   mutation SignUpMutation($name: String!, $email: String!, $password: String!) {
//     signUp(name: $name, email: $email, password: $password) {
//       ...UserFields
//     }
//   }
//   ${USER_FIELDS_FRAGMENT}
// `
