<template lang="pug">
  .work
    .work__head(@click='showModal = true')
      .work__title {{work.title}}
    transition(name='modal')
      .work__modal-wrapper(v-if='showModal')
        .work__modal-overlay(@click='showModal = false')
        .work__modal-container
          .work__modal-column
            input.work__modal-title(v-model='work.title' placeholder="Название")
            input.work__modal-date(v-model='work.tech' placeholder="Технологии")
            input.work__modal-href(v-model='work.href' placeholder="Ссылка")
            .work__modal-remove(@click='removeWork') Удалить
          .work__modal-column
            img.work__modal-img(:src='work.img' alt='Картинка')
</template>

<script>
export default {
  data: () => ({
    showModal: false
  }),
  props: {
    work: Object
  },
  methods: {
    removeWork() {
      this.$emit('removeWork', this.work.id)
      this.showModal = false
    }
  }
}
</script>

<style lang="sass" src='./style.sass' scoped></style>


