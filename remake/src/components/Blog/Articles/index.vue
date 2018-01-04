<template lang="pug">
  .articles__area
    Article(
      v-for='(article, index) in articles'
      :key='index'
      :article='article'
      @removeArticle='removeArticle'
      )
    button(@click='showPre = !showPre' style='margin-top: 20px') Открыть/Закрыть массив
    pre(v-if='showPre') {{articles}}
      
</template>

<script>
export default {
  data: () => ({
    showPre: false
  }),
  props: {
    articles: Array
  },
  methods: {
    removeArticle(articleId) {
      this.$emit('removeArticle', articleId)
    }
  },
  components: {
    Article: require('../Article')
  }
}
</script>

<style lang="sass" src='./style.sass' scoped></style>
