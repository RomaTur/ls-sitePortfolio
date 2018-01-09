<template lang="pug">
.wrapper
  .preloader
    svg(class="preloader__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
 width="144px" height="144px" viewBox="0 0 144 144" enable-background="new 0 0 144 144" xml:space="preserve")
      circle(class='preloader__circle-one' opacity="0.4" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-miterlimit="10" enable-background="new    " cx="72" cy="71.999" r="70")
      circle(class='preloader__circle-two' opacity="0.7" fill="none" stroke="#FFFFFF" stroke-width="3.8938" stroke-miterlimit="10" enable-background="new    " cx="72" cy="72" r="55")
      circle(class='preloader__circle-three' fill="none" stroke="#FFFFFF" stroke-width="4" stroke-miterlimit="10" cx="72" cy="72" r="40")
      span.preloader__text 0
</template>

<script>
export default {
  components: {
    // AppHeader: require('Header'),
    // Tabs: require('Tabs'),
    // About: require('About')
  }
}
</script>

