<template lang="pug">
.wrapper

  .preloader
    svg(class="preloader__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
 width="144px" height="144px" viewBox="0 0 144 144" enable-background="new 0 0 144 144" xml:space="preserve")
      circle(class='preloader__circle-one' opacity="0.4" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-miterlimit="10" enable-background="new    " cx="72" cy="71.999" r="70")
      circle(class='preloader__circle-two' opacity="0.7" fill="none" stroke="#FFFFFF" stroke-width="3.8938" stroke-miterlimit="10" enable-background="new    " cx="72" cy="72" r="55")
      circle(class='preloader__circle-three' fill="none" stroke="#FFFFFF" stroke-width="4" stroke-miterlimit="10" cx="72" cy="72" r="40")
    span.preloader__text 0
  .parallax#parallax
        .parallax__layer
            img(src=`~mountains/layer10.png`).parallax__layer-img.parallax__layer-img--sky
        .parallax__layer
            img(src=`~mountains/layer9.png`).parallax__layer-img
        .parallax__layer
            img(src=`~mountains/layer8.png`).parallax__layer-img
        .parallax__layer#cloud__three
            img(src=`~mountains/layer7.png`).parallax__layer-img
        .parallax__layer
            img(src=`~mountains/layer6.png`).parallax__layer-img
        .parallax__layer
            img(src=`~mountains/layer5.png`).parallax__layer-img
        .parallax__layer#cloud__two
            img(src=`~mountains/layer4.png`).parallax__layer-img
        .parallax__layer
            img(src=`~mountains/layer3.png`).parallax__layer-img
        .parallax__layer
            img(src=`~mountains/layer2.png`).parallax__layer-img
        .parallax__layer#cloud__one
            img(src=`~mountains/layer1.png`).parallax__layer-img



  include ./components/pug/config/mixins

  router-view
</template>

<script>
import parallaxBg from './modules/parallaxMountains'
export default {
  data: () => ({
    pages: [
      { name: 'Авторизация', route: '/' },
      { name: 'Обо мне', route: '/about' },
      { name: 'Блог', route: '/blog' },
      { name: 'Мои работы', route: '/works' }
    ]
  }),
  mounted(){
    parallaxBg()
  },
  components: {
    About: require('About'),
    Blog: require('Blog'),
    Index: require('Login'),
    Works: require('Works')
  }
}
</script>

<style lang="sass" src='./components/sass/layout/adjustment.sass' scoped></style>

