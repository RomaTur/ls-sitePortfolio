<template lang="pug">
    .content
        h2.title Страница &laquo;Обо мне&raquo;
        .skills__list
          skillsList(
            v-for='(skillType, index) in skillTypes'
            :skillGroup='skillType'
            :skills='skills'
            :key='index'
            @removeSkill="removeSkill"
            @addSkill="addSkill"
            @changePercents='changePercents'
          )
        .input__submit(@click='submitChanges') Сохранить 
        button(@click='showPre = !showPre' style='margin-top: 20px') Открыть/Закрыть массив
        pre(v-if='showPre') {{skills}}
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    skillTypes: ['Frontend', 'Backend', 'Workflow'],
    showPre: false
  }),
  methods: {
    ...mapActions('skills', ['fetchSkills']),
    ...mapMutations('skills', ['addNewSkill', 'removeSavedSkill', 'changeSavedPercents']),
    removeSkill(skillId) {
      this.removeSavedSkill(skillId)
    },
    addSkill(newSkill) {
      this.addNewSkill(newSkill)
    },
    changePercents(newPercent, skillId) {
      this.changeSavedPercents({
        new: newPercent,
        id: skillId
      })
    },
    submitChanges() {
      console.log('submitChanges')
    }
  },
  mounted() {
    this.fetchSkills()
  },
  computed: {
    ...mapGetters('skills', ['skills'])
  },
  components: {
    skillsList: require('./skills-list')
  }
}
</script>

<style lang="sass" src='./style.sass' scoped></style>
