<template lang="pug">
  header.header
    h1.title-text Панель администрирования
    a(:href="href").return-back Вернуться на сайт
</template>

<script>
export default {
  data: () => ({
    href: 'http://romatur.xyz'
  })
}
</script>

<style src="./style.sass" lang="sass" scoped></style>
