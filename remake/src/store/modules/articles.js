const posts = {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    articles: ({ data }) => (data)
  },
  mutations: {
    addNewArticle(state, article) {
      state.data.push(article)
    },
    removeSavedArticle(state, articleId) {
      state.data = state.data.filter(article => { return article.id !== articleId })
    }
  },
  actions: {
    fetchArticles({ state, rootGetters }) {
      const { $http } = rootGetters
      $http.get('Blog/data.json').then(response => {
        state.data = response.body
      }, response => {
        console.error(response)
      })
    }
  }
}

export default posts
