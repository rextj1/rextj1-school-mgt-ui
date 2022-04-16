// import gql from 'graphql-tag'
// import { TEACHER_FIELDS_FRAGMENT } from '@/graphql/teachers/fragments'
// import { STUDENT_FIELDS_FRAGMENT } from '@/graphql/students/fragments'

// export const BOOK_FIELDS_FRAGMENT = gql`
//   fragment BookFields on Book {
//     id
//     slug
//     name
//     description
//     author
//     book_type
//     rack_no
//     row_no
//     photo
//     total_copies
//     issued_copies
//   }
// `

// export const BOOK_REQUEST_FIELDS_FRAGMENT = gql`
//   fragment BookRequestFields on Book_Request {
//     id
//     slug
//     status
//     fine
//     return_date
//     issue_date
//     books {
//       ...BookFields
//     }
//     teacher {
//       ...TeacherFields
//     }
//     student {
//       ...StudentFields
//     }
//   }
//   ${(BOOK_FIELDS_FRAGMENT, TEACHER_FIELDS_FRAGMENT, STUDENT_FIELDS_FRAGMENT)}
// `
