<template>
    <div class="filter">
        <div class="product-wrapper" v-show="showProduct">
            <div class="products">
                <div class="all" @click="selectAll()" v-show="pro_filter_flag">
                    <checkbox :isChecked="selectAll_flag"></checkbox>
                    全选
                    </div>
                    <div class="pro" @click="showProPane()">
                    产品<i class="arrow"></i>
                    </div>
                </div>
                <div class="pro_list" v-show="pro_filter_flag">
                    <ul>
                        <li v-for="(pro,index) in pro_list" :key="index" @click="pro_toggle(pro,index)"><checkbox :isChecked="pro.selected"></checkbox><span class="name">{{pro.name}}</span></li>
                    </ul>
                </div>
            </div>
    </div>
</template>

<script>
import checkbox from 'com/checkbox/checkbox'

export default {
    props: {
        myChart: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            pro_filter_flag: false,
            selectAll_flag: true,
            pro_list: [],
            option: {},
            resetOption: {}, // 存储最开始的数据,
            preClass: '',
            showProduct: false,
        }
    },
    methods: {
        init() {
            // this.prevClass = this.$parent.$el._prevClass
            this.option = this.myChart.getOption()
            this.resetOption = this._deepCopy(this.myChart.getOption())
            this.initProList()
        },
        initProList() {
            let arr = []
            if (this.prevClass !== 'point') {
                this.showProduct = true
                this.option.xAxis[0].data.forEach((pro, index) => {
                    arr.push({
                        name: pro,
                        selected: true
                    })
                })
                this.pro_list = arr
            }
        },
        _deepCopy(obj) {
            let str, newobj;
            str = newobj = obj.constructor === Array ? [] : {};
            if (typeof obj !== 'object') {
                return
            } else if (window.JSON) {
                str = JSON.stringify(obj) // 系列化对象
                newobj = JSON.parse(str) // 还原
            } else {
                for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
                }
            }
            return newobj;
        },
        pro_toggle(pro, index) {
            pro.selected = !pro.selected
            this.selectAll_flag = this.isSelectAll()
            this.redraw()
        },
        redraw() {
            let option = this._deepCopy(this.resetOption)
            let count = 0
            this.pro_list.forEach((pro, index) => {
                index = index - count
                if (!pro.selected) {
                    option.xAxis[0].data.splice(index, 1)
                    option.series.forEach((obj) => {
                        obj.data.splice(index, 1)
                    })
                    count++
                }
            })
            this.myChart.setOption(option)
        },
        isSelectAll() {
            let flag = true
            this.pro_list.forEach((pro) => {
                if (!pro.selected) {
                    flag = false
                }
            })
            return flag
        },
        selectAll() {
            this.selectAll_flag = !this.selectAll_flag
            this.pro_list.forEach((pro) => {
                pro.selected = this.selectAll_flag
            })
            this.redraw()
        },
        showProPane() {
            this.pro_filter_flag = !this.pro_filter_flag
        }
    },
    mounted: function() {
        this.init()
    },
    components: {
        checkbox
    }
}
</script>

<style lang="stylus">
.filter
    position absolute 
    top 50px
    right -10px
    display flex
    padding 10px 0 0 28px
    font-size 12px
    line-height 11px
    color white
    z-index 9999
    .products
        position absolute
        display inline-block
        right 15px
        width 110px
        .all
            display inline-block
            margin-right 18px
            cursor pointer
        .v-checkbox
            position relative
            top 3px
            left 0px
        .pro
            float right
            padding 2px 25px 2px 2px
            overflow hidden
            cursor pointer
        .arrow
            position absolute
            width 6px
            height 6px
            margin-left 5px
            border-left 2px solid white
            border-bottom 2px solid white
            transform rotate(-45deg)
    .pro_list
        position absolute
        right 22px
        width 102px
        text-align left
        background #1e3642
        font-size 14px
        margin-top 22px
        overflow hidden
        z-index 9
        cursor pointer
        li
            height 36px
            line-height 36px
            border-bottom 1px solid rgba(255, 255, 255, 0.1)
            overflow hidden
        &:last-child
            border none
        .v-checkbox
            left 8px
            overflow hidden
        .name
            position absolute
            display inline-block
            right 0px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            width 70px
            overflow hidden
</style>


