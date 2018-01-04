<template lang="pug">
  .skills__group
      h3.skills__title {{ skillGroup }}
      ul.skills__list
        skill(
          v-for='(skill, index) in skills'
          v-if='checkSkillType(skillGroup) === skill.type'
          :id="skill.id"
          :key="skill.id"
          :title="skill.name",
          :percents="skill.percents"
          @removeSkill='removeSkill(skill.id)'
          @changePercents='changePercents'
        )
      .skills__add
        input.add__name(
          v-model='newSkillName' 
          :error="validation.hasError('skillName')"
          @keyup.enter='addSkill'
          )
        input.add__percents(
          v-model='newSkill.percents' 
          @keyup.enter='addSkill'
          )
        .add__per %
</template>

<script>

import { Validator } from 'simple-vue-validator'

export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    newSkillName: (value) => {
      return Validator.value(value).required('Название не может быть пустым')
    }
  },
  data: () => ({
    newSkillName: '',
    newSkill: {
      id: 100,
      name: '',
      percents: 0,
      type: 1
    }
  }),
  props: {
    skillGroup: String,
    skills: Array,
    index: Number
  },
  methods: {
    checkSkillType(skillGroup) {
      switch (skillGroup) {
        case 'Frontend':
          return 1
        case 'Workflow':
          return 2
        case 'Backend':
          return 3
      }
    },
    removeSkill(skillId) {
      this.$emit('removeSkill', skillId)
    },
    addSkill() {
      this.$validate().then(success => {
        if (!success) return
        this.$emit('addSkill', {
          id: Math.round(Math.random() * 1000000),
          name: this.newSkillName,
          percents: parseInt(this.newSkill.percents),
          type: this.checkSkillType(this.skillGroup)
        })
      })
        .then(success => {
          this.newSkillName = ''
          this.newSkill.percents = 0
        })
    },
    changePercents(newPercent, skillId) {
      this.$emit('changePercents', newPercent, skillId)
    }
  },
  components: {
    skill: require('../skill')
  }
}
</script>


<style lang="sass" src='./style.sass' scoped></style>

