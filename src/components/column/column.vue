<!-- 柱状图 -->
<template>
    <div class="columnChart">
        <div class="main" id="main" style="height:100%;"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import world from 'echarts/map/js/world'
import http from 'js/http'

export default {
    data() {
        return {
            colChart: {},
        }
    },
    methods: {
        _colCharts() {

        },
    },
    mounted: function() {
        window.addEventListener('resize', function() { // 第一步：main中添加style="100%",第二步：添加.bind(this)
            this.colChart.resize()
        }.bind(this));
    }
  
}
</script>

<style lang="stylus">
.columnChart
    height 800px
    background url('../../assets/bg.jpg') no-repeat
    background-size 100% 100%
    color white
    .main
        width 100%
        height calc(100% - 1px)
        margin-top -15px
</style>