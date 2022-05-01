import gql from 'graphql-tag'

export const SINGLE_SUBJECTS_FIELDS_FRAGMENT = gql`
  fragment SingleSubjectsFields on Subject {
    id
    subject
  }
`
// id: ID!
// slug: String!
// subject: String
// klase: Klase @belongsTo
// teacher: Teacher @belongsTo
// student: Student @belongsTo

// export const SUBJECTS_FIELDS_FRAGMENT = gql`
//   fragment SingleSubjectsFields on Subject {
//     id
//     slug
//     subject
//     klase {
//       id
//       name
//     }
//     student {
//       id
//       first_name
//       last_name
//     }
//     teacher {
//       id
//       first_name
//       last_name
//     }
//   }
// `
