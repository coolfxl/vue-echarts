<!-- 柱状图 -->
<template>
    <div class="pie">
        <div class="main" id="main" style="height:100%;"></div>
		<Date-picker type="datetimerange" class="datepicker" format="yyyy-MM-dd" confirm placement="bottom-start" placeholder="选择日期" ref="datepicker" :options="options2" :value="value2" @on-change="onChangeDate" @on-ok="okChange" @on-clear="onClear"></Date-picker>
        <Button type="primary" shape="circle" icon="ios-search" class="search" @click="onSearch()"></Button>
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
			pieChart: {},
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
        _pieCharts(json) {
            var dom = document.querySelector('.pie .main')
			this.pieChart = echarts.init(dom);
			var app = {}, option = null;

			option = {
				title: {
					text: '战斗力，库存TOP10',
					// subtext: '纯属虚构',
					x: 'center',
					y: '10px',
					textStyle: {
                        color: '#fff',
                        fontWeight: 300
                    }
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					type: 'scroll',
                    right: 30,
					bottom: 80,
					textStyle: {
						color: '#fff'
					},
					data: json.names
				},
				// toolbox: {
				// 	show: true,
				// 	feature: {
				// 		mark: {
				// 			show: true
				// 		},
				// 		dataView: {
				// 			show: true,
				// 			readOnly: false
				// 		},
				// 		magicType: {
				// 			show: true,
				// 			type: ['pie', 'funnel']
				// 		},
				// 		restore: {
				// 			show: true
				// 		},
				// 		saveAsImage: {
				// 			show: true
				// 		}
				// 	}
				// },
				calculable: true,
				series: [{
						name: '战斗力top10',
						type: 'pie',
						radius: [20, 110],
						center: ['30%', '50%'],
						roseType: 'radius',
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							},
							normal:{ 
								label:{ 
									show: true, 
									formatter: '{b} : {c} ({d}%)' 
								}, 
								labelLine :{show:true} 
							} 
						},
						label: {
							normal: {
								show: true
							},
							emphasis: {
								show: true
							}
						},
						lableLine: {
							normal: {
								show: false
							},
							emphasis: {
								show: true
							}
						},
						data: json.users
					},
					{
						name: '库存top10',
						type: 'pie',
						radius: [30, 110],
						center: ['70%', '50%'],
						roseType: 'area',
						data: json.goods,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							},
							normal:{ 
								label:{ 
									show: true, 
									formatter: '{b} : {c} ({d}%)' 
								}, 
								labelLine :{show:true} 
							} 
						}
					}
				]
			};;
			if(option && typeof option === "object") {
				this.pieChart.setOption(option, true);
			}
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
                this.$Message.info('没有后台数据对接哦！');
            }
        },
        // 时间插件
        onClear() {
            console.log('今日实况')
        },
        // 搜索事件
        onSearch() {
            if(this.startTime != '' && this.endTime != '') {
                var params = {startTime: this.startTime, endTime: this.endTime}
                this._showPie(params)
            } else {
                // this._showPie()
            }

        }
    },
    mounted: function() {
		var json = {
				"users": [{
					"name": "唐三",
					"username": "用户id：c9677",
					"value": 4369
				}, {
					"name": "小舞",
					"username": "用户id：c9721",
					"value": 3657
				}, {
					"name": "戴沐白",
					"username": "用户id：c15167",
					"value": 1828
				}, {
					"name": "宁荣荣",
					"username": "用户id：c13562",
					"value": 1643
				}, {
					"name": "朱竹清",
					"username": "用户id：c100",
					"value": 1577.80
				}, {
					"name": "马红俊",
					"username": "用户id：c11428",
					"value": 1408
				}, {
					"name": "胖子",
					"username": "用户id：c790",
					"value": 1178
				}, {
					"name": "弗兰德",
					"username": "用户id：c24112",
					"value": 1167
				}, {
					"name": "劳伦斯",
					"username": "用户id：c313",
					"value": 1096
				}, {
					"name": "千寻",
					"username": "用户id：c2425",
					"value": 1067
				}],
				"names": ["唐三", "小舞", "戴沐白", "宁荣荣", "朱竹清", "马红俊", "胖子", "弗兰德", "劳伦斯", "千寻", "恒大冰泉", "千趣红石榴VC", "维生素C", "伊利纯牛奶", "NAYASA保温杯", "纯悦水", "茶叶蛋", "可口可乐", "惠普笔记本", "龙猫枕头"],
				"goods": [{
					"username": 66,
					"name": "恒大冰泉",
					"value": 2376
				}, {
					"username": 136,
					"name": "千趣红石榴VC",
					"value": 1736
				}, {
					"username": 2788,
					"name": "维生素C",
					"value": 1340
				}, {
					"username": 1689,
					"name": "伊利纯牛奶",
					"value": 1043
				}, {
					"username": 3928,
					"name": "NAYASA保温杯",
					"value": 1016
				}, {
					"username": 1651,
					"name": "纯悦水",
					"value": 1005
				}, {
					"username": 3710,
					"name": "茶叶蛋",
					"value": 964
				}, {
					"username": 563,
					"name": "可口可乐",
					"value": 939
				}, {
					"username": 3100,
					"name": "惠普笔记本",
					"value": 865
				}, {
					"username": 721,
					"name": "龙猫枕头",
					"value": 856
				}]
			}
		this._pieCharts(json)
        window.addEventListener('resize', function() { // 第一步：main中添加style="100%",第二步：添加.bind(this)
            this.pieChart.resize()
		}.bind(this));
		
    }
  
}
</script>

<style lang="stylus">
.pie
    height 100%
    background url('../../assets/bg.jpg') no-repeat
    background-size 100% 100%
    .main
        width 100%
        height calc(100% - 1px)
	.search
        position absolute 
        top 51px
        left 355px
    .datepicker
        position absolute 
        top 50px
        left 100px
        width 240px
</style>
