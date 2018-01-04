<template lang="pug">
  .input__area
    h3.title Добавить работу
    input.input(
      v-model='title' 
      placeholder="Название проекта" 
      :error="validation.hasError('title')"
      )
    input.input(v-model='tech' placeholder="Технологии")
    input.input(v-model='href' placeholder="Ссылка")
    .input.input__file
      .input__file-logo
      .input__file-text Загрузить Картинку
    button.input__add(@click='addWork') Добавить
</template>

<script>
import { Validator } from 'simple-vue-validator'
export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    title: (value) => {
      return Validator.value(value).required('Название не может быть пустым')
    }
  },
  data: () => ({
    title: '',
    tech: '',
    href: ''
  }),
  methods: {
    addWork() {
      this.$validate().then(success => {
        console.log('click')
        if (!success) return
        this.$emit('addWork', {
          title: this.title,
          id: Math.round(Math.random() * 1000000),
          tech: this.tech,
          href: this.href
        })
        this.title = ''
        this.tech = ''
        this.href = ''
      })
    }
  }
}
</script>

<style lang="sass" src='./style.sass' scoped></style>


