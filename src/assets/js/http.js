import axios from 'axios'
import router from '../../router/index'

const apiURL = 'http://data.estore.ai:8080'
const cameURL = 'http://estore.ai'

// axios.defaults.baseURL = ''
// const baseURL = window.location.origin
if (process.env.NODE_ENV != 'development') {
  axios.interceptors.request.use((config) => {
    if( config.url.match(/^\/camera\/api/) ){
      config.baseURL = cameURL
      console.log(config.baseURL+'========='+cameURL)
      config.url = config.url.replace(/^\/camera/, '')
    } else if( config.url.match(/^\/api/) ){
      config.baseURL = apiURL
      console.log(config.baseURL+'========='+apiURL)
      config.url = config.url.replace(/^\/api/, '')
    }
    return config
  })
}

axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true // 开启cookie

/* 请求 request 拦截器 */
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
      if(config.data){
        let data = config.data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        config.data = ret.slice(0, ret.length - 1)
        config.url += '?' + config.data
      }
    }
    if (config.method === 'get') {
      if(config.data){
        let data = config.data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        config.data = ret.slice(0, ret.length - 1)
        config.url += '?' + config.data
      }
    }
    return config
 
}, (error) => {
  alert('错误的传参', 'fail')
  return Promise.reject(error)
})

/* 反应 response 拦截器 */
axios.interceptors.response.use((response) => { // 7token不存在
  if (response.data.code == 9 || response.data.code == 8 || response.data.code == 7) {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('username')
      // router.replace({
      //     path: '/login',
      //     query: {redirect: router.currentRoute.fullPath}
      // })
      return Promise.reject(response.data.msg)
  } else {
      return response
  }
}, (error) => {
  console.log(error)
})

function http(url, method, params) {
  let met = ''
  if(method != 'post'){
    met = 'get'
  }else {
    met = 'post'
  }
  if(params){
    return new Promise((resolve, reject) => {
    axios({
      method: met
      ,url: url
      ,data: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
  }else{
    return new Promise((resolve, reject) => {
    axios({
        method: met
        ,url: url
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  
}

// localhost:8080/api/echarts
export default {

  // 图表测试
  echarts(data){
    return http('/api/autointerface/echarts','get',data)
  },

  /* ================================================================概况 start ================================================================ */
    
    // 今日实时概况 ：进店访问数， 访问用户数（原先会员）， 新注册会员数， 注册转化率 （包含比率）
    /* userMainToday(data) {  // 01-26
      return http('/api/records/range/recent', 'get', data)
    }, */

    userMainToday(data) {
      return http('/api/records/range/recent', 'get', data)
    },
    
    // 今日实时概况 ：付款订单数，销售额，客单价（包含比率）
    ordersMainToday(){
      return http('/api/orders/range/recent', 'get')
    },
    
    // 销量前5店铺:begin,end
    topFive(data) {
      return http('/api/stores/top5','get', data)
    },

    // 近一周概况图表 ： 付款订单数， 销售额
    ordersChart(data){
      return http('/api/orders/range', 'get', data)
    },

    // 近一周概况图表： 进店访问数， 新客率， 购买率， 注册率
    usersChart(data) {
      return http('/api/records/range', 'get', data)
    },

    // 概况： 今日， 近一周， 近一个月， 近一个季度， 近一年， 任意范围
    
  /* ================================================================end 概况 ================================================================ */
    




  /* ================================================================店铺分析 start================================================================ */
  
    // 店铺分析 ： 列表信息 加载表格数据
    attachStores(data) {
      return http('/api/attach/stores', 'get', data)
    },
    
    // 特定ID今日实时状况 ：进店访问数
    singleStoreRealUsers(data) {
      return http('/api/records/stores/'+ data.id +'/range/recent', 'get')
    },
    
    // 特定ID今日实时状况 ： 付款订单数， 销售额， 客单价， 店铺钱包余额
    singleStoreRealOrders(data) {
      return http('/api/stores/'+data.id+'/range/recent', 'get')
    },

    // 图表特定id店铺概况 ： 进店访问数， 购买率
    singleStoreRangeUsers(data) {
      if(data.type == '') {
        return http('/api/records/stores/'+ data.id +'/range', 'get', data)
      } else {
        return http('/api/records/stores/'+ data.id +'/range/'+ data.type, 'get', data)
      }
    },
    
    // 图表特定ID店铺概况 ： 付款订单数， 销售额
    singleStoreRangeOrders(data) {
      if(data.type == '') {
        return http('/api/stores/'+data.id+'/range', 'get', data)
      } else {
        return http('/api/stores/'+data.id+'/range/'+data.type, 'get', data)
      }
    },

  /* ================================================================end 店铺分析================================================================ */





  /* ================================================================商品分析 start================================================================ */
    
  // 商品信息
    merchandises(data){
      return http('/api/merchandises', 'get', data)
    },

  /* ================================================================end 商品分析================================================================ */





  /* ================================================================交易分析 start================================================================ */
    
    // 总交易数据 ： 访问人数， 新注册会员数， 交易额
    allVisiters(data) {
      return http('/api/records', 'get', data)
    },
    // 总交易数据 ： 付款订单数， 销售额， 客单价
    ordersAll(data){
      return http('/api/orders', 'get', data)
    },
    
    // 总的新注册会员数
    registerRange(){
      return http('/api/users/register/count/range', 'get')
    },

  /* ================================================================end 交易分析================================================================ */





  /* ================================================================浏量分析 start================================================================ */
  
    // 总流量趋势 ： 最近一周， 最近一个月， 最近三个月， 时间范围
    allRange(data) {
      if(data.type == '') {
        return http('/api/records/range', 'get', data)
      } else {
        return http('/api/records/range/'+data.type, 'get', data)
      }
    },

  /* ================================================================end 浏量分析================================================================ */





  /* ================================================================会员分析 start================================================================ */

    // 会员信息 ： 列表 加载表格数据
    attachUser(data) {
      return http('/api/attach/users', 'get', data)
    },

    // 特定ID今日实时状况 ：进店访问数
    singleUserRealUsers(data) {
      return http('/api/records/users/'+ data.id +'/range/recent', 'get')
    },
    
    // 特定ID今日实时状况 ： 付款订单数， 销售额， 客单价， 店铺钱包余额
    singleUserRealOrders(data) {
      return http('/api/users/'+data.id+'/range/recent', 'get')
    },

    // 图表特定id店铺概况 ： 进店访问数， 购买率
    singleUserRangeUsers(data) {
      if(data.type == '') {
        return http('/api/records/users/'+ data.id +'/range', 'get', data)
      } else {
        return http('/api/records/users/'+ data.id +'/range/'+ data.type, 'get', data)
      }
    },
    
    // 图表特定ID店铺概况 ： 付款订单数， 销售额
    singleUserRangeOrders(data) {
      if(data.type == '') {
        return http('/api/users/'+data.id+'/range', 'get', data)
      } else {
        return http('/api/users/'+data.id+'/range/'+data.type, 'get', data)
      }
    },

    // 会员信息 ： 店铺偏好
    shopPreference(data) {
      return http('/api/records/users/' + data.id + '/top')
    },

  /* ================================================================end 会员分析================================================================ */





  /* ================================================================登陆 start================================================================ */

    // 登录
    login(data) {
      return http('/api/managers', 'post', data)
    },

  /* ================================================================end 登陆================================================================ */





  /* ================================================================硬件设备 start================================================================ */
    // 硬件设备
    deviceList(data) {
      return http('/api/devices', 'get', data)
    },
    play(data) {
      return http('/video/openapi/preview/rtmp', 'post', data)
    },
    shopList(data) {
      return http('/camera/api/video/app/shoplist', 'post', data)
    },
    shopChnid(data) {
      return http('/camera/api/video/app/shopchnid', 'post', data)
    },
  /* ================================================================end 硬件设备================================================================ */
  

  /* ================================================================获取省份 start================================================================ */


  /* ================================================================end 获取省份================================================================ */

}