import gql from 'graphql-tag'
import { ACCOUNTANT_FIELDS_FRAGMENT } from './fragments'

export const ACCOUNTANT_QUERIES = gql`
  query AccountantsQuery {
    accountants {
      ...AccountantFields
    }
  }
  ${ACCOUNTANT_FIELDS_FRAGMENT}
`
export const ACCOUNTANT_QUERY = gql`
  query accountantQuery($slug: String!) {
    accountant(slug: $slug) {
      ...AccountantFields
    }
  }
  ${ACCOUNTANT_FIELDS_FRAGMENT}
`
