import gql from 'graphql-tag'

export const CREATE_KLASE_MUTATION = gql`
  mutation CreateKlaseMutation($name: String!) {
    createKlase(name: $name) {
      id
      name
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
      name
    }
  }
`
