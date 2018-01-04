<template lang="pug">
  .tabs
    ul.tabs__list
      router-link(
        v-for="(tab, index) in tabs"
        :key="index"
        tag="li"
        active-class="active"
        :to="tab.route"
        exact
      ).tabs__item
        span.tabs-link {{tab.name}}
</template>

<script>
export default {
  data: () => ({
    tabs: [
      { name: 'Обо мне', route: '/' },
      { name: 'Блог', route: '/blog' },
      { name: 'Мои работы', route: '/works' }
    ]
  })
}
</script>

<style src="./style.sass" lang="sass" scoped></style>
