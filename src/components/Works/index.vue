<template lang="pug">
.works
    - var title = 'Мои работы'
    - var secClass = 'div class="menu__line"'
    - var page = 'works'
    include ../pug/common/works/header
    .menu
        ul.menu__list
            router-link(
               v-for="(page, index) in pages"
               :key="index"
               tag="li"
               :to="page.route"
               exact
             ).menu__item
              .menu__line
              a.menu__link {{page.name}}
              .menu__line
    Slider
    .footer
      include ../pug/common/works/footer
      Footer
</template>

<script>
// import parallaxBg from '../../modules/parallaxMountains'
import smoothScrollClick from '../../modules/smothScrollClick.js'
import fullMenu from '../../modules/fullMenu'
import form from '../../modules/form'
import blurForm from '../../modules/blurForm'
import isScroll from '../../modules/isScroll'
import jump from 'jump.js'
import doFnElemVisible from '../../modules/doFnElemVisible'

import animatePreloader from '../../modules/animatePreloader'
export default {
  data: () => ({
    pages: [
      { name: 'Мои работы', route: '/works' },
      { name: 'Блог', route: '/blog' },
      { name: 'Обо мне', route: '/about' },
      { name: 'Авторизация', route: '/' },
    ]
  }),
  mounted(){


    animatePreloader()
    isScroll(true)
    // parallaxBg(); //запуск скрипта инициализации паралакса
    smoothScrollClick('header__arrow-img', 'content', undefined, jump);
    smoothScrollClick('footer__arrow', 'wrapper', undefined, jump);
    fullMenu('hamburger', 'menu');
    
    blurForm()
    form();
  },
  components: {
    Slider: require('./Slider/index.vue'),
    Footer: require('../Footer')
  }
}
</script>


<style lang="sass" src='../sass/works.sass' scoped></style>

