import Swal from 'sweetalert2'

export default ({ graphQLErrors }, { route, app, redirect }) => {
  if (graphQLErrors) {
    const unauthed = graphQLErrors.find(
      (err) => err.message === 'Unauthenticated.'
    )

    const guestRoutes = ['login', 'signup']

    if (unauthed && !guestRoutes.includes(route.name)) {
      app.$auth.setUser(null)

      redirect({
        name: 'login',
        query: { next: route.path },
      })

      Swal.fire({
        icon: 'info',
        title: 'Session Expired!',
        text: 'Please log in again to continue.',
        confirmButtonText: 'Okay',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-primary px-5 mt-2 mb-5',
        },
      })
    }
  }
}
