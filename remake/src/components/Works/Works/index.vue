<template lang="pug">
  .list
    Work(
      v-for='(work, index) in works'
      :key='index'
      :work='work'
      @removeWork='removeWork'
      )
    button(@click='showPre = !showPre' style='margin-top: 20px') Открыть/Закрыть массив
    pre(v-if='showPre') {{works}}
      
</template>

<script>
export default {
  data: () => ({
    showPre: false
  }),
  props: {
    works: Array
  },
  methods: {
    removeWork(workId) {
      this.$emit('removeWork', workId)
    }
  },
  components: {
    Work: require('../Work')
  }
}
</script>

<style lang="sass" src='./style.sass' scoped></style>
