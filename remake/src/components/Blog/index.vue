<template lang="pug">
  .content
    h2.title Страница &laquo;Блог&raquo;
    .articles
      addArticle(
        @addArticle='addArticle'
      )
      Articles(
        :articles='articles'
        @removeArticle='removeArticle'
        )
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapActions('articles', ['fetchArticles']),
    ...mapMutations('articles', ['addNewArticle', 'removeSavedArticle']),
    addArticle(article) {
      this.addNewArticle(article)
    },
    removeArticle(articleId) {
      this.removeSavedArticle(articleId)
    }
  },
  mounted() {
    this.fetchArticles()
  },
  computed: {
    ...mapGetters('articles', ['articles'])
  },
  components: {
    addArticle: require('./AddArticle'),
    Articles: require('./Articles')
  }
}
</script>

<style lang="sass" src='./style.sass' scoped></style>


