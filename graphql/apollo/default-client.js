import Swal from 'sweetalert2'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
// import { InMemoryCache } from 'apollo-cache-inmemory'

const inProduction = process.env.NODE_ENV === 'production'
const tld = inProduction ? 'com' : 'test'
const protocol = inProduction ? 'https' : 'http'

const errorLink = ({ redirect, route }) => {
  return onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      const { statusCode, result } = networkError
      if (statusCode === 402 && result.message === 'NoSubscriptionOrExpired') {
        return false // Do not retry request
      } else {
        // console.log(`[Network error]: ${networkError}`)
      }
    }

    if (graphQLErrors) {
      graphQLErrors.map(async (err) => {
        const { extensions } = err
        if (extensions.code && extensions.code === 'TokenExpired') {
          await Swal.queue([
            {
              icon: 'warning',
              title: 'Session Expired!',
              text: 'Please log in again to continue.',
              confirmButtonText: 'Okay',
              showLoaderOnConfirm: true,
              preConfirm: () => {
                redirect({
                  name: 'login',
                  query: { next: route.path },
                })
              },
            },
          ])
        }
      })

      return false
    }
  })
}

export default function DefaultConfig(ctx) {
  // const cache = new InMemoryCache()
  return {
    link: ApolloLink.from([errorLink(ctx)]),
    // cache,
    // required
    httpEndpoint: `${protocol}://sms.${tld}/graphql`,

    // optional
    // See https://www.apollographql.com/docs/link/links/http.html#options
    httpLinkOptions: {
      credentials: 'same-origin',
    },
    // You can use `wss` for secure connection (recommended in production)
    // Use `null` to disable subscriptions
    // wsEndpoint: 'ws://localhost:4000', // optional
    // LocalStorage token
    // tokenName: 'apollo-token', // optional
    // Enable Automatic Query persisting with Apollo Engine
    persisting: false, // Optional
    // Use websockets for everything (no HTTP)
    // You need to pass a `wsEndpoint` for this to work
    websocketsOnly: false, // Optional
  }
}
