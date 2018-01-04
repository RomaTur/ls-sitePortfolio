<template lang="pug">
  .content
    h2.title Страница &laquo;Мои работы&raquo;
    .works
      addWork(
        @addWork='addWork'
      )
      Works(
        :works='works'
        @removeWork='removeWork'
      )
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapActions('works', ['fetchWorks']),
    ...mapMutations('works', ['addNewWork', 'removeSavedWork']),
    addWork(work) {
      this.addNewWork(work)
    },
    removeWork(workId) {
      this.removeSavedWork(workId)
    }
  },
  mounted() {
    this.fetchWorks()
  },
  computed: {
    ...mapGetters('works', ['works'])
  },
  components: {
    addWork: require('./addWork'),
    Works: require('./Works')
  }
}
</script>

<style lang="sass" src='./style.sass' scoped></style>


