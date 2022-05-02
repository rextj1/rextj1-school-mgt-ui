import gql from 'graphql-tag'

export const CREATE_KLASE_MUTATION = gql`
  mutation CreateKlaseMutation($name: String!) {
    createKlase(name: $name) {
      id
      name
      teachers {
        id
        first_name
        last_name
        slug
      }
    }
  }
`

export const UPDATE_KLASE_MUTATION = gql`
  mutation UpdateKlaseMutation($id: ID!, $name: String!) {
    updateKlase(id: $id, name: $name) {
      id
      name
    }
  }
`

export const DELETE_KLASE_MUTATION = gql`
  mutation DeleteKlaseMutation($id: ID!) {
    deleteKlase(id: $id) {
      id
      # teachers {
      #   id
      #   first_name
      #   last_name
      # }
    }
  }
`
// assign klase to teacher
export const ASSIGN_KLASE_TO_TEACHER_MUTATION = gql`
  mutation assignKlaseTeacherMutation($klase: Int!, $teacher: [Int!]) {
    assignKlaseToTeacher(klase: $klase, teacher: $teacher) {
      id
      name
    }
  }
`
