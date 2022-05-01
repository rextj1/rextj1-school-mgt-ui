import gql from 'graphql-tag'

export const CREATE_TIMETABLE_MUTATION = gql`
  mutation CreateTimetableMutation(
    $monday: String
    $tuesday: String
    $wednesday: String
    $thursday: String
    $friday: String
    $time: String
    $klase_id: Int!
  ) {
    createTimetable(
      monday: $monday
      tuesday: $tuesday
      wednesday: $wednesday
      thursday: $thursday
      friday: $friday
      time: $time
      klase_id: $klase_id
    ) {
      id
      monday
      tuesday
      wednesday
      thursday
      friday
      time
    }
  }
`

export const UPDATE_TIMETABLE_MUTATION = gql`
  mutation UpdateTimetableMutation(
    $id: ID!
    $monday: String
    $tuesday: String
    $wednesday: String
    $thursday: String
    $friday: String
    $time: String
    $klase_id: Int!
  ) {
    updateTimetable(
      id: $id
      monday: $monday
      tuesday: $tuesday
      wednesday: $wednesday
      thursday: $thursday
      friday: $friday
      time: $time
      klase_id: $klase_id
    ) {
      id
      monday
      tuesday
      wednesday
      thursday
      friday
      time
    }
  }
`
export const DELETE_TIMETABLE_MUTATION = gql`
  mutation deleteTimetableMutation($id: ID!) {
    deleteTimetable(id: $id) {
      id
    }
  }
`
