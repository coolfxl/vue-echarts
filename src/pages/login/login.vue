<template>
  <div>
    <div class="login">
      <div style="margin-bottom: 15px;margin-left:-20px">
        <img src="../../assets/logo.png" />
      </div>
      <div class="user">
        <Input v-model="username" placeholder="用户名" style="width: 280px" class="username"></Input>
      </div>
      <div class="pass">
        <Input v-model="password" placeholder="密码" style="width: 280px" class="password" type="password"></Input>
      </div>
      <div class="code">
        <Input v-model="code" placeholder="验证码" style="width: 120px;float:left;margin-bottom:20px" class="code" type="text"></Input>
        <img width="120" height="40" alt="点击更换" ref="codeImg" src="" style="cursor:pointer;margin-left: 20px;" @click="changeCode()" />
      </div>
      <div class="button">
        <Button type="primary" class="loginon"  style="width: 280px;height:40px" @click="login">登录</Button>
      </div>
    </div>
  </div>
</template>

<script>
import http from 'js/http'
import {getCookieTime, setCookie, getCookie} from 'js/util'
export default {
  data() {
    return {
      username: '',
      password: '',
      code: ''
    }
  },
  methods: {
    go(data) {
      this.$nextTick(function () {
        http.login(data)
          .then( res => {
            this.$Message.info({
                content:'正在登录中，请稍后',
                duration: 2
            });
            if(res.data.code === 200 && res.data.message === 'OK'){
              setCookie('credential', res.data.data, 'm60')
              window.localStorage.setItem('token', res.data.data)
              window.localStorage.setItem('username', this.username)
              this.$router.push('/basic') // 路由跳转
            } else {
              this.$Message.error({
                content:'登录异常，请检查用户名和密码是否正确',
                duration: 4
              });
              this.password = ''
            }
          })
      })
    },
    changeCode() {
			this.$refs.codeImg.attr("src", "/captcha/code?abc="+Math.random());
		},
    clear() {
      this.username = ''
      this.password = ''
      this.code = ''
    },
    login() {
      if(this.username === ''){
        this.$Message.info('请输入用户名')
        return
      }
      if(this.password === ''){
        this.$Message.info('请输入密码')
        return
      }
      // if(this.code === ''){
      //   this.$Message.info('请输入验证码')
      //   return
      // }
      let data = {username: this.username, password: this.password, code:this.code}
      this.go(data)
    },
    testJquery() {
      $(function() {
        $(".loginon").css("background","red")
      })
    }
  },
  mounted: function() {
    this.testJquery()
  }
}
</script>

<style lang="stylus">
  .ivu-btn-primary 
    color #fff
    background-color #c76e3b
    border-color #c76e3b
  
  .ivu-inputhover 
    border-color #c76e3b
  
  .ivu-inputfocus 
    border-color #c76e3b
    box-shadow 0 0 0 2px rgb(199, 110, 59)
  
  .ivu-input
    text-indent 1rem
    height 40px
  .ivu-inputhover
    border-color #c76e3b
  .login
    min-width 280px
    width 260px
    height 300px
    margin 0 auto
    padding-top 200px
    div
      width 260px
      margin 0 auto
      margin-bottom 10px
    .button
      .ivu-btn-primary
        color #fff
        background-color #C76E3B
        border-color #C76E3B
</style>
