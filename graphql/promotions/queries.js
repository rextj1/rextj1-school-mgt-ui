import gql from 'graphql-tag'

export const PROMOTESTUDENTS_QUERIES = gql`
  query PromoteStudentsQuery(
    $status: Boolean!
    $klase_id: Int!
    $session_id: Int!
    $workspaceId: Int
  ) {
    promoteStudents(
      status: $status
      klase_id: $klase_id
      session_id: $session_id
      workspaceId: $workspaceId
    ) {
      id
      first_name
      last_name
      adm_no
      cum_avg
      klase {
        id
        name
      }
      status
      session {
        id
        name
      }
    }
  }
`
export const SET_PROMOTION_QUERIES = gql`
  query SetPromotionQuery($workspaceId: Int) {
    setPromotion(workspaceId: $workspaceId) {
      id
      name
    }
  }
`

export const RESET_PROMOTE_QUERIES = gql`
  query ResetPromoteQuery(
    $status: Boolean!
    $from_class: Int!
    $from_session: Int!
    $from_term: Int!
    $workspaceId: Int
  ) {
    resetPromotion(
      status: $status
      from_class: $from_class
      from_session: $from_session
      from_term: $from_term
      workspaceId: $workspaceId
    ) {
      id
      from_class
      from_session
      from_term
      status
      student {
        id
        first_name
        last_name
        photo

        klase {
          id
          name
        }
      }

      # session {
      #   id
      #   name
      # }
    }
  }
`

export const RESET_KLASE_QUERIES = gql`
  query resetKlaseQuery($id: ID!, $workspaceId: Int) {
    resetKlase(id: $id, workspaceId: $workspaceId) {
      id
      name
    }
  }
`
