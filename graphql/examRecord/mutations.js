import gql from 'graphql-tag'

export const UPDATE_PUBLISH_RESULT_MUTATION = gql`
  mutation UpdatePublishResultMutation(
    $klase_id: Int!
    $status: String!
    $session_id: Int!
    $term_id: Int!
  ) {
    updatePublishResult(
      klase_id: $klase_id
      status: $status
      session_id: $session_id
      term_id: $term_id
    ) {
      id
      status
    }
  }
`
