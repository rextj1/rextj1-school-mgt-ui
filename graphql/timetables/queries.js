import gql from 'graphql-tag'

import { SINGLE_TIMETABLE_FIELDS_FRAGMENT } from './fragments'

// export const TIMETABLE_QUERIEX = gql`
//   query TimetableXQuery {
//     timetables {
//       ...SingleTimetableFields
//       klase {
//         id
//         name
//       }
//     }
//   }
//   ${SINGLE_TIMETABLE_FIELDS_FRAGMENT}
// `
export const TIMETABLE_QUERIES = gql`
  query TimetablesQuery($klase_id: Int!, $slug: String) {
    timetables(klase_id: $klase_id, slug: $slug) {
      ...SingleTimetableFields
      # klase {
      #   id
      #   name
      # }
    }
  }
  ${SINGLE_TIMETABLE_FIELDS_FRAGMENT}
`
export const TIMETABLE_QUERY = gql`
  query TimetableQuery($id: Int!, $slug: String) {
    timetable(id: $id, slug: $slug) {
      ...SingleTimetableFields
      # klase {
      #   id
      #   name
      # }
    }
  }
  ${SINGLE_TIMETABLE_FIELDS_FRAGMENT}
`

// export const TIMETABLE_QUERIEX = gql`
//   query Timetablexuery {
//     timetabless {
//       id
//       subject
//       monday
//       tuesday
//       wednesday
//       thursday
//       friday
//       time
//       klase {
//         id
//         slug
//         name
//       }
//     }
//   }
// `
