import gql from 'graphql-tag'

import {
  PERMISSION_FIELDS_FRAGMENT,
  ROLE_FIELDS_FRAGMENT,
  USER_FIELDS_FRAGMENT,
  USERS_FIELDS_FRAGMENT,
} from './fragments'

export const COUNTRY_QUERIES = gql`
  query CountriesQuery {
    countries {
      id
      name
      state {
        id
        name
      }
    }
  }
`

export const COUNTRY_QUERY = gql`
  query CountryQuery($id: ID) {
    country(id: $id) {
      state {
        id
        name
      }
    }
  }
`

export const BLOOOD_GROUP_QUERIES = gql`
  query BloodGroupQuery {
    bloodGroups {
      id
      name
    }
  }
`

export const USERS_ROLE_QUERY = gql`
  query UsersQuery {
    users {
      ...UserRolesFields
    }
  }
  ${USERS_FIELDS_FRAGMENT}
`

export const USER_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`

export const PERMISSIONS_QUERY = gql`
  query PermissionsQuery {
    permissions {
      ...PermissionFields
    }
  }
  ${PERMISSION_FIELDS_FRAGMENT}
`
export const ROLEX_QUERY = gql`
  query rolex($page: Int) {
    rolex(first: 10, page: $page) {
      data {
        ...RoleFields
      }
      paginatorInfo {
        currentPage
        lastPage
      }
    }
  }
  ${ROLE_FIELDS_FRAGMENT}
`
export const USER_ROLE_QUERY = gql`
  query userRoles($id: ID!) {
    user(id: $id) {
      ...UserFields
      roles {
        id
        name
      }
    }
  }
  ${USER_FIELDS_FRAGMENT}
`

// export const USER_ROLE_QUERY = gql`
//   query ($id: ID!) {
//     user(id: $id) {
//       ...UserFields
//       roles{
//         id
//         name
//       }
//     }
//   }
//   ${USER_FIELDS_FRAGMENT}
// `

export const USERS_QUERY = gql`
  query OtpQuery {
    users {
      email
    }
  }
`
// export const COUNTRY_NAME_QUERY = gql`
//   query CountryQuery {
//     country {
//       id
//       name
//       state {
//         id
//         name
//       }
//     }
//   }
// `

export const LGA_QUERY = gql`
  query LgaQuery {
    lga {
      id
      name
    }
  }
`
export const BLOOD_GROUP_QUERY = gql`
  query BloodGroupQuery {
    bloodGroup {
      name
    }
  }
`
