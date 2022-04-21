import gql from 'graphql-tag'

import { DRIVER_FIELDS_FRAGMENT } from './fragments'

export const DRIVER_QUERIES = gql`
  query DriversQuery {
    drivers {
      ...DriverFields
    }
  }
  ${DRIVER_FIELDS_FRAGMENT}
`
export const DRIVER_QUERY = gql`
  query DriverQuery($slug: String!) {
    driver(slug: $slug) {
      ...DriverFields
    }
  }
  ${DRIVER_FIELDS_FRAGMENT}
`
