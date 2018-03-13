<template>
    <div class="columnpie">
        <div class="main" style="height:100%;"></div>
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
            colpieChart: {}
        }
    },
    methods: {
        _doColumnPie(json) {
            var dom = document.querySelector('.columnpie .main')
			this.colpieChart = echarts.init(dom);
			var app = {},option = null;
			app.title = '水印 - ECharts 下载统计'
			var builderJson = {
				"all": 10887,
				"charts": {
					"2018-04-04": 3237,
					"lines": 2164,
					"bar": 7561,
					"line": 7778,
					"pie": 7355,
					"scatter": 2405,
					"candlestick": 1842,
					"radar": 2090,
					"heatmap": 1762,
					"treemap": 1593,
					"graph": 2060,
					"boxplot": 1537,
					"parallel": 1908,
					"gauge": 2107,
					"funnel": 1692,
					"sankey": 1568
				},
				"pay": { // 添加的组
					"2018-04-04": 900,
					"lines": 2164,
					"bar": 7561,
					"line": 7778,
					"pie": 7355,
					"scatter": 2405,
					"candlestick": 1842,
					"radar": 2090,
					"heatmap": 1762,
					"treemap": 1593,
					"graph": 2060,
					"boxplot": 1537,
					"parallel": 1908,
					"gauge": 2107,
					"funnel": 1692,
					"sankey": 1568
				},
				"components": {
					"geo": 2788,
					"title": 9575,
					"legend": 9400,
					"tooltip": 9466,
					"grid": 9266,
					"markPoint": 3419,
					"markLine": 2984,
					"timeline": 2739,
					"dataZoom": 2744,
					"visualMap": 2466,
					"toolbox": 3034,
					"polar": 1945
				},
				"ordercount": { // 添加的组
					"geo": 278,
					"title": 9575,
					"legend": 9400,
					"tooltip": 9466,
					"grid": 9266,
					"markPoint": 3419,
					"markLine": 2984,
					"timeline": 2739,
					"dataZoom": 2744,
					"visualMap": 2466,
					"toolbox": 3034,
					"polar": 1945
				},
				"ie": 9743
			};

			var downloadJson = {
				"echarts.min.js": 17365,
				"echarts.simple.min.js": 4079,
				"echarts.common.min.js": 6929,
				"echarts.js": 14890,
				"geo": 278,
				"title": 9575,
				"legend": 9400,
				"tooltip": 9466,
				"grid": 9266,
				"markPoint": 3419,
				"markLine": 2984,
				"timeline": 2739,
				"dataZoom": 2744,
				"visualMap": 2466,
				"toolbox": 3034,
				"polar": 1945,
				"2018-04-04": 900,
				"lines": 2164,
				"bar": 7561,
				"line": 7778,
				"pie": 7355,
				"scatter": 2405,
				"candlestick": 1842,
				"radar": 2090,
				"heatmap": 1762,
				"treemap": 1593,
				"graph": 2060,
				"boxplot": 1537,
				"parallel": 1908,
				"gauge": 2107,
				"funnel": 1692,
				"sankey": 1568
			};

			var themeJson = {
				"dark.js": 1594,
				"infographic.js": 925,
				"shine.js": 1608,
				"roma.js": 721,
				"macarons.js": 2179,
				"vintage.js": 1982
			};

			var waterMarkText = 'ECHARTS';

			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			canvas.width = canvas.height = 100;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.globalAlpha = 0.08;
			ctx.font = '20px Microsoft Yahei';
			ctx.translate(50, 50);
			ctx.rotate(-Math.PI / 4);
			ctx.fillText(waterMarkText, 0, 0);

			option = {
				backgroundColor: {
					type: 'pattern',
					image: canvas,
					repeat: 'repeat'
				},
				legend: {
					orient: 'horizotal',
					x: '46%',
					y: '10%',
                    data: ['进店访问数', '付款订单数', '购买率', '销售额', '利润额', '利润率'],
                    textStyle: {
                        color: '#fff'
                    }
				},
				tooltip: {},
				title: [
                    {
                        text: '在线构建',
                        subtext: '总计 ' + builderJson.all,
                        x: '25%',
                        textAlign: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    }, 
                    {
                        text: 'niha',
                        subtext: '总计 ' + builderJson.all,
                        x: '25%',
                        y: '55%',
                        textAlign: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    }, 
                    {
                        text: '购买率', // 添加的组
                        subtext: '总计 ' + Object.keys(downloadJson).reduce(function(all, key) {
                            return all + downloadJson[key];
                        }, 0),
                        x: '75%',
                        textAlign: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    }, 
                    {
                        text: '利润率', // 添加的组
                        subtext: '总计 ' + Object.keys(themeJson).reduce(function(all, key) {
                            return all + themeJson[key];
                        }, 0),
                        x: '75%',
                        y: '50%',
                        textAlign: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    }
                ],
				grid: [
                        {
                        top: 20,
                        width: '50%',
                        bottom: '46%',
                        left: 10,
                        containLabel: true
                    }, {
                        top: '58%',
                        width: '50%',
                        bottom: 0,
                        left: 10,
                        containLabel: true
                    }],
                    xAxis: [
                        {
                            type: 'value',
                            max: builderJson.all,
                            splitLine: {
                                show: false
                            },
                            axisLine:{ // 轴字体颜色设置
                                lineStyle:{
                                    color: '#fff'
                                }                         
                            }
                        }, 
                    {
                        type: 'value',
                        max: builderJson.all,
                        gridIndex: 1,
                        splitLine: {
                            show: false
                        },
                        axisLine:{
                            lineStyle:{
                                color: '#fff'
                            }                         
                        }
                    }
                ],
				yAxis: [
                    {
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine:{
                            lineStyle:{
                                color: '#fff'
                            }                         
                        }
                    }, 
                    {
                        gridIndex: 1,
                        type: 'category',
                        data: Object.keys(builderJson.components),
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine:{
                            lineStyle:{
                                color: '#fff'
                            }                         
                        }
                    }
                ],
				series: [{
						name: '进店访问数',
						type: 'bar',
						stack: 'pay',
						z: 3,
						label: {
							normal: {
								position: 'right',
								show: true
							}
						},
						data: Object.keys(builderJson.pay).map(function(key) {
							return builderJson.pay[key];
						})
					},
					{ // 添加的组
						name: '付款订单数',
						type: 'bar',
						stack: 'chart',
						z: 3,
						label: {
							normal: {
								position: 'right',
								show: true
							}
						},
						data: Object.keys(builderJson.charts).map(function(key) {
							return builderJson.charts[key];
						})
					},
					{ // 添加的组
						name: '利润额',
						type: 'bar',
						stack: 'component',
						xAxisIndex: 1,
						yAxisIndex: 1,
						z: 3,
						label: {
							normal: {
								position: 'right',
								show: true
							}
						},
						data: Object.keys(builderJson.components).map(function(key) {
							return builderJson.components[key];
						})
					},
					{ // 添加的组
						name: '销售额', 
						type: 'bar',
						stack: 'ordercount',
						xAxisIndex: 1,
						yAxisIndex: 1,
						textStyle: {
							color: '#f5f5f5'
						},
						itemStyle: {
							normal: {
								color: '#e8e'
							}
						},
						data: Object.keys(builderJson.ordercount).map(function(key) {
							return builderJson.ordercount[key];
						})
					},
					{
						name: '购买率',
						type: 'pie',
						radius: [0, '30%'],
						center: ['75%', '25%'],
						data: Object.keys(downloadJson).map(function(key) {
							return {
								name: key,
								value: downloadJson[key]
							}
						})
					},
					{
						name: '利润率',
						type: 'pie',
						radius: [0, '30%'],
						center: ['75%', '75%'],
						data: Object.keys(themeJson).map(function(key) {
							return {
								name: key.replace('.js', ''),
								value: themeJson[key]
							}
						})
					}
				]
			};
			if(option && typeof option === "object") {
				this.colpieChart.setOption(option, true);
			}
        }
    },
    mounted: function() {
        this._doColumnPie()
        window.addEventListener('resize', function() { // 第一步：main中添加style="100%",第二步：添加.bind(this)
            this.colpieChart.resize()
        }.bind(this));
    }
}
</script>

<style lang="stylus">
.columnpie
    background url('../../assets/bg.jpg') no-repeat
    background-size 100% 100%
    height 100%
    .main
        height calc(100% - 1px)
        width 100%
        transition all 0.5s linear
</style>
