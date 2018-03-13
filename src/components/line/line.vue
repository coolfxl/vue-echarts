<!-- 层叠柱状图 -->
<template>
    <div class="line">
        <div class="main" style="height:100%;"></div>
        <Date-picker type="datetimerange" class="datepicker" format="yyyy-MM-dd" confirm placement="bottom-end" placeholder="选择日期" ref="datepicker" :options="options2" :value="value2" @on-change="onChangeDate" @on-ok="okChange" @on-clear="onClear"></Date-picker>
        <v-filter :myChart="lineChart" v-if="lineChart._dom"></v-filter>
    </div>
</template>

<script>
import filter from 'com/filter/filter'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import world from 'echarts/map/js/world'
import http from 'js/http'

export default {
    data() {
        return {
            lineChart: {},
            options2: {
                shortcuts: [
                {
                    text: '最近一周',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        return [start, end];
                    },
                    onClick: (picker) => {
                    }
                },
                {
                    text: '最近一个月',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        return [start, end];
                    },
                    onClick: (picker) => {
                    }
                },
                {
                    text: '最近三个月',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        return [start, end];
                    },
                    onClick: (picker) => {
                    }
                }
                ]
            },
            value2: '',
            startTime: '',
            endTime: '',
        }
    },
    methods: {
        _lineCharts() {
            var dom = document.querySelector('.line .main')
            this.lineChart = echarts.init(dom);
            var app = {},option = null;
            option = {
                title: {
                    x: 'center',
                    text: '折线图堆叠',
                    textStyle: {
                        color: '#fff',
                        fontWeight: 300
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                // legend线条颜色 
                color:['#48cda6','#fd87ab','#11abff','#ffdf33','#968ade'],
                legend: {
                    x: '57%',
                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
                    textStyle: {
                        // legend字体颜色
                        color: '#fff'
                    }
                },
                grid: {
                    left: '3%',
                    right: '3.5%',
                    top: '16%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    show: false,
                    feature: {
                        saveAsImage: {},
                        // magicType: {//动态类型切换
                        //     type: ['bar', 'line']
                        // }
                    }
                },
                xAxis: {
                    name: '产品',
                    type: 'category',
                    boundaryGap: true,
                    data: ['周一','周二','周三','周四','你好','周六','周日'],
                    //设置轴线的属性
                    axisLine:{
                        lineStyle:{
                            color: '#fff',
                            type:'solid'  //'dotted'虚线 'solid'实线
                        }                         
                    }
                },
                yAxis: {
                    name: '数量',
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            color: ['rgba(230, 230, 230, 0.2)'],
                            type:'dotted'  //'dotted'虚线 'solid'实线
                        }
                    },
                    axisLine: {
                        lineStyle:{
                            color: '#fff',
                            type:'solid'  //'dotted'虚线 'solid'实线
                        }                         
                    }
                },
                series: [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };
            if (option && typeof option === "object") {
                this.lineChart.setOption(option, true);
            };
            // 绑定点击事件
            this.lineChart.on('click', function (params) {
                console.log(params)
            });
        },
        // 时间插件
        onChangeDate(date) { // daterange改变的时候触发的事件 默认接收一个date对象
            this.startTime = date[0];
            this.endTime = date[1];
        },
        // 时间插件
        okChange() { // 点击确定按钮触发的事件
            var params = {startTime: this.startTime, endTime: this.endTime}
            if( params.startTime === '' || params.endTime=== '') {
                this.$Message.info('请选择日期范围');
                return
            } else {
                this._showPoint(params)
            }
        },
        // 时间插件
        onClear() {
            console.log('今日实况')
        },

    },
    mounted: function() {
        this._lineCharts()
        window.addEventListener('resize', function() { // 第一步：main中添加style="100%",第二步：添加.bind(this)
            this.lineChart.resize()
        }.bind(this));
    },
    components: {
        'v-filter': filter
    }
  
}
</script>

<style lang="stylus">
.line
    background url('../../assets/bg.jpg') no-repeat
    background-size 100% 100%
    .main
        width 100%
        height calc(100% - 1px)
    .datepicker
        position absolute 
        top 50px
        width 240px
</style>