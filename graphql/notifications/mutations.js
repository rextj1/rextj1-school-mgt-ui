import gql from 'graphql-tag'

export const MARK_AS_READ = gql`
  mutation ($notifiable_id: Int!) {
    markAsRead(notifiable_id: $notifiable_id) {
      id
    }
  }
`
