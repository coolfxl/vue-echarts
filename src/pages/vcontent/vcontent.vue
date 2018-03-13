<template>
  <div id="vcontent">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="container">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import vHeader from 'com/vHeader/vHeader'
import vNav from 'com/vNav/vNav'
export default {
  name: 'vcontent',
  data() {
    return {
      
    }
  }, 
  methods: {

  }, 
  components: {
    vHeader,
    vNav
  }
}
</script>

<style lang="stylus">
@import '../../assets/css/mixin'
#vcontent,.container
  width 100%
  height 100%
  overflow hidden
</style>
