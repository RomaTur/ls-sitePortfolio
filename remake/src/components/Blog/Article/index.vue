<template lang="pug">
  .article
    .article__head(@click='showModal = true')
      .article__date {{article.date}}
      .article__title {{article.title}}
    transition(name='modal')
    .article__modal-wrapper(v-if='showModal')
      .article__modal-overlay(@click='showModal = false')
      .article__modal-container
        .article__modal-head
          input.article__modal-title(v-model='article.title' placeholder="Название статьи")
          input.article__modal-date(v-model='article.date' placeholder="Дата")
        textarea.article__modal-text(v-model='article.text' placeholder="Содержание")
        .article__modal-remove(@click='removeArticle') Удалить
</template>

<script>
export default {
  data: () => ({
    showModal: false
  }),
  props: {
    article: Object
  },
  methods: {
    removeArticle() {
      this.$emit('removeArticle', this.article.id)
      this.showModal = false
    }
  }
}
</script>

<style lang="sass" src='./style.sass' scoped></style>


