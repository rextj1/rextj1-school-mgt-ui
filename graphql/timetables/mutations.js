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
    $workspace: String
  ) {
    createTimetable(
      monday: $monday
      tuesday: $tuesday
      wednesday: $wednesday
      thursday: $thursday
      friday: $friday
      time: $time
      klase_id: $klase_id
      workspace: $workspace
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
    $workspace: String
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
      workspace: $workspace
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
  mutation deleteTimetableMutation($id: Int!, $workspace: String) {
    deleteTimetable(id: $id, workspace: $workspace) {
      id
    }
  }
`
