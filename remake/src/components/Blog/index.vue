<template lang="pug">
.blog
    - var title = 'Блог'
    - var secClass = 'div class="menu__line"'
    - var page = 'blog'
    include ../pug/common/blog/header
    .menu
        ul.menu__list
            //- +listItem('Мои работы', 'menu', 'works.html', '', secClass)
            //- +listItem('Блог', 'menu', 'blog.html', '', secClass)
            //- +listItem('Обо мне', 'menu', 'about.html', '', secClass)
            //- +listItem('Авторизация', 'menu', 'index.html', '', secClass)
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
    include ../pug/common/blog/content
    //- include ../pug/config/footer
    Footer
</template>

<script>
// import parallaxBg from '../../modules/parallaxMountains'
import jump from 'jump.js'
import smoothScrollClick from '../../modules/smothScrollClick.js'
import fullMenu from '../../modules/fullMenu'
import blogSideBar from '../../modules/blogSideBar'

import animatePreloader from '../../modules/animatePreloader'
import isScroll from '../../modules/isScroll'
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
    fullMenu('hamburger', 'menu');
    blogSideBar('article__list', 'article__list-circle', jump);
  },
  components: {
    Footer: require('../Footer')
  }
}
</script>


<style lang="sass" src='../sass/blog.sass' scoped></style>

