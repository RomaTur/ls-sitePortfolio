<template lang="pug">
  .content
    include ../../pug/config/mixins
    //- pre {{works}}
    .content__title
        .content__title-line
        h2.content__title-text Мои работы
        .content__title-line
        +svg('content__title-bg', 'works_header')
    .content__works#slider
            .content__works-left
                .school__title
                    transition(name='current__title')
                      .school__title-line(v-if='showCurrent')
                    div.school__title-text {{ currentProject.title || 'Название' }}
                    transition(name='current__title')
                      .school__title-line(v-if='showCurrent')
                transition(name='current__title')
                  h3.school__tech(v-if='showCurrent') {{ currentProject.tech || 'Технологии' }}
                transition(name='current__title')
                  a.school__link(v-if='showCurrent' target='_blank' :href='currentProject.href')
                      +svg('school__link-ico', 'link')
                      span.school__link-text {{ currentProject.linkText || 'Перейти' }}
            .content__works-right
                transition(name='fade' v-on:after-leave="afterLeaveCurrent")
                    .work__current(v-if='showCurrent')
                        img( :src="currentProject.img", alt="currentProject" class="work__current-img")
                .work__another
                    .work__view(@click='nextproject')
                        transition(name='slideUp' v-on:after-leave="afterLeaveNext")
                            .work__view-images(v-if='showNext')
                                img(:src="nextProject.img", alt="nextProject" class="work__view-img")
                                img(:src="nextProject2.img", alt="nextProject2" class="work__view-img--next")
                        .work__view-overlay
                            +svg('work__slide-down', 'arrow_down')
                    .work__view(@click='previousproject')
                        transition(name='slideDown' v-on:after-leave="afterLeavePrevious")
                            .work__view-images(v-if='showPrevious')
                                img(:src="previousProject.img", alt="previousProject" class="work__view-img")
                                img(:src="previousProject2.img", alt="previousProject2" class="work__view-img--previous")
                        .work__view-overlay
                            +svg('work__slide-up', 'arrow_down')

</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    showCurrent: true,
    showNext: true,
    showPrevious: true,
    workNum: 0,
    elem: '',
    currentProject: {
        title: '',
        tech: '',
        href: '',
        linkText: '',
        img: ''
    },
    previousProject: {
        title: '',
        tech: '',
        href: '',
        linkText: '',
        img: ''
    },
    previousProject2: {
        title: '',
        tech: '',
        href: '',
        linkText: '',
        img: ''
    },
    nextProject: {
        title: '',
        tech: '',
        href: '',
        linkText: '',
        img: ''
    },
    nextProject2: {
        title: '',
        tech: '',
        href: '',
        linkText: '',
        img: ''
    }
  }),
  methods: {
    ...mapActions('works', ['fetchWorks']),

    nextproject: function () {
      (this.workNum < this.works.length - 1) ? this.workNum++ : this.workNum = 0;
      let changeNext = new Promise((resolve, reject) => {
        resolve();
      }).then(() => {
        this.changeOthers();
        this.beforeLeaveCurrentTitle()
      }).then(() => {
        this.showCurrent = !this.showCurrent;
        this.showNext = !this.showNext;
        this.showPrevious = !this.showPrevious;
      });
    },
    previousproject: function () {
      (this.workNum > 0) ? this.workNum-- : this.workNum = this.works.length - 1;
      let changePrevious = new Promise((resolve, reject) => {
        resolve();
      }).then(() => {
        this.changeOthers()
        this.beforeLeaveCurrentTitle()
      }).then(() => {
        this.showCurrent = !this.showCurrent;
        this.showNext = !this.showNext;
        this.showPrevious = !this.showPrevious;
      });
    },
    changeCurrent: function () {
      this.currentProject = this.works[this.workNum];
      (this.workNum < this.works.length - 1) ? this.nextProject = this.works[this.workNum + 1]: this.nextProject = this.works[0];
      (this.workNum > 0) ? this.previousProject = this.works[this.workNum - 1]: this.previousProject = this.works[this.works.length - 1];
      this.showCurrent = !this.showCurrent;
      this.beforeEnterCurrentTitle()
    },
    changeOthers: function () {
      (this.workNum < this.works.length - 1) ? this.nextProject2 = this.works[this.workNum + 1]: this.nextProject2 = this.works[0];
      (this.workNum > 0) ? this.previousProject2 = this.works[this.workNum - 1]: this.previousProject2 = this.works[this.works.length - 1];
    },
    beforeEnterCurrentTitle: function() {
      this.elem = document.querySelector('.school__title-text')
      let text = this.currentProject.title
      this.elem.innerHTML = text.replace(/./g, '<span class="new">$&</span>')
      const list = document.querySelectorAll('span.new')
      list.forEach(function(item, index) {
          item.style.opacity = '0'
      })
      list.forEach(function(item, index) {
        setTimeout(function() {
          item.classList.add('div_opacity')
          item.style.opacity = '1'
        }, 500 * index / list.length)
      })

    },
    beforeLeaveCurrentTitle: function() {
      const list = document.querySelectorAll('span.new')
      list.forEach(function(item, index) {
        setTimeout(function() {
          item.classList.add('div_opacity')
          item.style.opacity = '0'
        },  500 * index / list.length)
      })
    },
    afterLeaveCurrent: function () {
      this.changeCurrent();
    },
    afterLeaveNext: function () {
      this.showNext = !this.showNext;
    },
    afterLeavePrevious: function () {
      this.showPrevious = !this.showPrevious;
    },
    changeCurrentTime: function() {
      setTimeout(this.changeCurrent, 1000)
    }
  },
  mounted(){
    this.fetchWorks()
    this.changeCurrentTime()
  },
  computed: {
    ...mapGetters('works', ['works'])
  }
}

</script>


<style lang="sass" src='../../sass/pages/works/content.sass' scoped></style>
