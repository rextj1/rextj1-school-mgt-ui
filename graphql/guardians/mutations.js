import gql from 'graphql-tag'
import { SINGLE_STUDENT_FIELD_FRAGMENT } from '../students/fragments'

export const UPLOAD_PHOTO_MUTATION = gql`
  mutation UploadPhotoMutation($id: ID!, $photo: Upload, $workspaceId: Int!) {
    uploadPhoto(id: $id, photo: $photo, workspaceId: $workspaceId) {
      id
      photo
      blood_group {
        name
      }
      guardian {
        id
        slug
        email
        students {
          ...SingleStudentField
        }
      }
    }
  } ${SINGLE_STUDENT_FIELD_FRAGMENT}
`
