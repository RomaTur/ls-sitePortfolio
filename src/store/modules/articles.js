import blogSideBar from '../../modules/blogSideBar'
import jump from 'jump.js'
const posts = {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    articles: ({ data }) => (data)
  },
  actions: {
    fetchArticles({ state, rootGetters }) {
      const { $http } = rootGetters
      $http.get('/dist/Blog.json').then(response => {
        state.data = response.body
      }, response => {
        console.error(response)
      }).then(() => {
        blogSideBar('article__list', 'article__list-circle', jump)
      })
    }
  }
}

export default posts
