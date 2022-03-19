import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'asizy',
      paths: ['sitting'],
    })(store)
  })
}
