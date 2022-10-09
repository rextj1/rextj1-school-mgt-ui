import gql from 'graphql-tag'

import { SINGLE_EXAM_TIMETABLE_FIELDS_FRAGMENT } from './fragments'

export const EXAM_TIMETABLE_QUERIES = gql`
  query ExamTimetablesQuery($klase_id: Int!, $workspaceId: Int, $section_id: Int!) {
    examTimetables(klase_id: $klase_id, workspaceId: $workspaceId,section_id: $section_id) {
      ...SingleExamTimetableFields
    }
  }
  ${SINGLE_EXAM_TIMETABLE_FIELDS_FRAGMENT}
`
export const EXAM_TIMETABLE_QUERY = gql`
  query ExamTimetableQuery($id: ID!, $workspaceId: Int) {
    examTimetable(id: $id, workspaceId: $workspaceId) {
      ...SingleExamTimetableFields
    }
  }
  ${SINGLE_EXAM_TIMETABLE_FIELDS_FRAGMENT}
`
