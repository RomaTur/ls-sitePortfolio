<template lang="pug">
  .admin
    .header
      AppHeader
    .tabs
      Tabs
    router-view 
</template>

<script>
export default {
  components: {
    AppHeader: require('Header'),
    Tabs: require('Tabs'),
    About: require('About')
  }
}
</script>

