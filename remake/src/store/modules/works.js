const works = {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    works: ({ data }) => (data)
  },
  mutations: {
    addNewWork(state, work) {
      state.data.push(work)
    },
    removeSavedWork(state, workId) {
      state.data = state.data.filter(work => { return work.id !== workId })
    }
  },
  actions: {
    fetchWorks({ state, rootGetters }) {
      const { $http } = rootGetters
      $http.get('Works/data.json').then(response => {
        state.data = response.body
      }, response => {
        console.error(response)
      })
    }
  }
}

export default works
