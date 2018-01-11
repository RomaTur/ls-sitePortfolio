<template lang="pug">
  .content
    include ../../pug/config/mixins
    .content__title
        .content__title-line
        h2.content__title-text Мои работы
        .content__title-line
        +svg('content__title-bg', 'works_header')
    .content__works#slider
            .content__works-left
                .school__title
                    .school__title-line
                    h2.school__title-text {{ currentProject.title || 'Название' }}
                    .school__title-line
                h3.school__tech {{ currentProject.tech || 'Технологии' }}
                a.school__link(:href='currentProject.href')
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

    
export default {
  data: () => ({
    showCurrent: true,
    showNext: true,
    showPrevious: true,
    workNum: 0,
    works: [{
        title: 'Сайт школы онлайн образования',
        tech: 'HTML, CSS, Javascript',
        href: 'https://loftschool.com',
        linkText: 'Посмотреть сайт',
        img: '/src/assets/img/work-1.png'
      },
      {
        title: 'Статичный сайт',
        tech: 'HTML, CSS',
        href: '#',
        linkText: 'Заценить',
        img: '/src/assets/img/work-2.png'
      },
      {
        title: 'Лэндинг',
        tech: 'HTML, CSS, Javascriptб jQuery',
        href: '#',
        linkText: 'Вкусить',
        img: '/src/assets/img/work-3.png'
      },
      {
        title: 'Сайт-визитка',
        tech: 'HTML, CSS, Javascript',
        href: '#',
        linkText: 'Изумиться',
        img: '/src/assets/img/loremGif.gif'
      }
    ],
    currentProject: {},
    previousProject: {},
    previousProject2: {},
    nextProject: {},
    nextProject2: {}
  }),
  methods: {
    nextproject: function () {
      (this.workNum < this.works.length - 1) ? this.workNum++ : this.workNum = 0;
      let changeNext = new Promise((resolve, reject) => {
        resolve();
      }).then(() => {
        this.changeOthers();
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
    },
    changeOthers: function () {
      (this.workNum < this.works.length - 1) ? this.nextProject2 = this.works[this.workNum + 1]: this.nextProject2 = this.works[0];
      (this.workNum > 0) ? this.previousProject2 = this.works[this.workNum - 1]: this.previousProject2 = this.works[this.works.length - 1];
    },
    afterLeaveCurrent: function () {
      this.changeCurrent();
    },
    afterLeaveNext: function () {
      this.showNext = !this.showNext;
    },
    afterLeavePrevious: function () {
      this.showPrevious = !this.showPrevious;
    }

  },
  mounted() {
    console.log('hi')
    // let sliderBlock = document.querySelector('#slider')
    // let currentSliderImg = document.querySelector('.work__current-img')


    /////////инициализация слайдов/////
    this.currentProject = this.works[this.workNum];
    this.nextProject = this.works[this.workNum + 1];
    this.nextProject2 = this.works[this.workNum + 2]
    this.previousProject = this.works[this.works.length - 1];
    this.previousProject2 = this.works[this.works.length - 2];
    //////функции по замене слайдов//////
    // let changeCurrent = (workNum, $this) => {
    //   $this.currentProject = $this.works[workNum];
    //   (workNum < $this.works.length - 1) ? $this.nextProject = $this.works[workNum + 1]: $this.nextProject = $this.works[0];
    //   (workNum > 0) ? $this.previousProject = $this.works[workNum - 1]: $this.previousProject = $this.works[$this.works.length - 1];
    // }
    // let changeOthers = (workNum, $this) => {
    //   (workNum < $this.works.length - 1) ? $this.nextProject2 = $this.works[workNum + 1]: $this.nextProject2 = $this.works[0];
    //   (workNum > 0) ? $this.previousProject2 = $this.works[workNum - 1]: $this.previousProject2 = $this.works[$this.works.length - 1];
    // }
  }
}

</script>


<style lang="sass" src='../../sass/pages/works/content.sass' scoped></style>
