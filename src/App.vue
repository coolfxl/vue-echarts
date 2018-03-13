<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app', 
  data() {
    return {
      
    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style lang="stylus">
@import './assets/css/mixin'
#app
  width 100%
  height 100%
  font-size $ft-normal
</style>
