<template>
    <div class="dashboard">
        <div class="flex-container column">
            <div class="item one" @click="clickChart('1')" style="transform: translate(-22.4%,-33.5%) scale(0.33)">
                <multipleColumn></multipleColumn>
            </div>
            <div class="item two" @click="clickChart('2')" style="transform: translate(-22.4%,0.5%) scale(0.33)">
                <pie></pie>
            </div>
            <div class="item three" @click="clickChart('3')" style="transform: translate(-22.4%,34.5%) scale(0.33)">
                <v-line></v-line>
            </div>
            <div class="item four active" @click="clickChart('4')" style="transform: translate(43.7%, 0) scale(1)">
                <point></point>
            </div>
        </div>
    </div>
</template>

<script>
import pie from 'com/pie/pie'
import line from 'com/line/line'
import multipleColumn from 'com/multipleColumn/multipleColumn'
import point from 'com/point/point'

export default {
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    oresize() {
      this.$root.charts.forEach((myChart) => {
        myChart.resize()
      })
    },
    init() {
      this.items = document.querySelectorAll('.flex-container .item')
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].dataset.order = i + 1;
      }
    },
    clickChart(clickIndex) {
      let activeItem = document.querySelector('.flex-container .active')
      let activeIndex = activeItem.dataset.order
      let clickItem = this.items[clickIndex - 1]
      if (activeIndex === clickIndex) {
        return
      }
      activeItem.classList.remove('active')
      clickItem.classList.add('active')
      this._setStyle(clickItem, activeItem)
    },
    _setStyle(el1, el2) {
      let transform1 = el1.style.transform
      let transform2 = el2.style.transform
      el1.style.transform = transform2
      el2.style.transform = transform1
    }
  },
  components: {
    multipleColumn,
    point,
    'v-line': line,
    pie: pie
  }
}

</script>

<style lang="stylus">
*
    box-sizing: border-box;
.point,.multipleColumn,.columnChart,.line,.pie
    height 100%!important
    width 100%!important
    background none!important
.item
    padding: 0px;
    margin: 0px;
    width: 65%;
    height: 100%;
    position absolute
    transform scale(0.33)
    text-align: center;
    transition:all 0.8s;
    background rgba(32, 32, 35, 0.5)
    margin-left -50px
.dashboard
    position relative
    width 100%
    height 100%
    margin:0px;
    padding:0px;
    padding-top 5%
    background url('../../assets/bg.jpg');
    background-size 100% 100%
.flex-container.column
    position relative
    height: 90%;
    width: 100%;
    overflow: hidden;
    margin:  0 auto 100px auto;
    box-sizing: content-box;
.active
    height 100%
    width: 70%
    line-height: 300px;
</style>
