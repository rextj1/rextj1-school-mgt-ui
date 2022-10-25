import gql from 'graphql-tag'

import { SINGLE_TIMETABLE_FIELDS_FRAGMENT } from './fragments'

export const TIMETABLE_QUERIES = gql`
  query TimetablesQuery($klase_id: Int!, $section_id: Int!, $workspaceId: Int) {
    timetables(
      klase_id: $klase_id
      section_id: $section_id
      workspaceId: $workspaceId
    ) {
      ...SingleTimetableFields
      
    }
  }
  ${SINGLE_TIMETABLE_FIELDS_FRAGMENT}
`
export const TIMETABLE_QUERY = gql`
  query TimetableQuery($id: Int!, $workspaceId: Int) {
    timetable(id: $id, workspaceId: $workspaceId) {
      ...SingleTimetableFields
  
    }
  }
  ${SINGLE_TIMETABLE_FIELDS_FRAGMENT}
`
