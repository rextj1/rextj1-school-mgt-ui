import gql from 'graphql-tag'

export const CREATE_EXAM_TIMETABLE_MUTATION = gql`
  mutation CreateExamTimetableMutation(
    $monday: String
    $tuesday: String
    $wednesday: String
    $thursday: String
    $friday: String
    $time: String
    $date: String
    $klase_id: Int!
    $section_id: Int!
    $workspaceId: Int
  ) {
    createExamTimetable(
      monday: $monday
      tuesday: $tuesday
      wednesday: $wednesday
      thursday: $thursday
      friday: $friday
      time: $time
      date: $date
      klase_id: $klase_id
      section_id: $section_id
      workspaceId: $workspaceId
    ) {
      id
      monday
      tuesday
      wednesday
      thursday
      friday
      time
      date
    }
  }
`

export const UPDATE_EXAM_TIMETABLE_MUTATION = gql`
  mutation UpdateExamTimetableMutation(
    $id: ID!
    $monday: String
    $tuesday: String
    $wednesday: String
    $thursday: String
    $friday: String
    $time: String
    $date: String
    $klase_id: Int!
    $workspaceId: Int
  ) {
    updateExamTimetable(
      id: $id
      monday: $monday
      tuesday: $tuesday
      wednesday: $wednesday
      thursday: $thursday
      friday: $friday
      time: $time
      date: $date
      klase_id: $klase_id
      workspaceId: $workspaceId
    ) {
      id
      monday
      tuesday
      wednesday
      thursday
      friday
      time
      date
    }
  }
`
export const DELETE_EXAM_TIMETABLE_MUTATION = gql`
  mutation deleteExamTimetableMutation($id: ID!, $workspaceId: Int) {
    deleteExamTimetable(id: $id, workspaceId: $workspaceId) {
      id
    }
  }
`
