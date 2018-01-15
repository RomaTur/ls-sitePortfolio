const works = {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    works: ({ data }) => (data)
  },
  actions: {
    fetchWorks({ state, rootGetters }) {
      const { $http } = rootGetters
      $http.get('/dist/Works.json').then(response => {
        state.data = response.body
      }, response => {
        console.error(response)
      })
    }
  }
}

export default works
