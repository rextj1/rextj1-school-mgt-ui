import gql from 'graphql-tag'

export const USER_NOTIFICATION_QUERIES = gql`
  query userNotification($id: ID) {
    user(id: $id) {
      id
      notifications {
        id
        type
        data {
          description
          workspace_id
        }
        read_at
        created_at
      }
      unreadNotifications {
        type
        read_at
      }
    }
  }
`