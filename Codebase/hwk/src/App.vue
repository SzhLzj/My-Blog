<template>
  <AppMain/>
</template>

<script>
import rem from '@/assets/remVue.js'
import AppMain from './components/AppMain.vue'

export default {
  name: 'App',
  components: {
    AppMain,
  },
  data() {
    return {
      HtmlFontSize: rem,
    }
  }
}
</script>

<style>
 *{
  margin: 0;
  padding: 0;
 }
</style>