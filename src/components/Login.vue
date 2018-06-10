<template>
  <div id="Login">
  
    <div v-if="!islogin">
      <div v-if="haserror" class="errorMsg">{{errormsg}}</div>
      <div class="loginWrap">
        <div class="loginPanel">
          <div class="brandLogo"></div>
          <form action="#">
            <div class="input-field">
              <input placeholder="email" v-on:keyup.enter="login" v-model="email" id="email" type="text" class="validate">
              <div v-if="invalidemail" class="error">- Invalid input</div>
            </div>
            <div class="input-field">
              <input placeholder="password" v-on:keyup.enter="login" v-model="password" id="pwd" type="password" class="validate">
              <div v-if="invalidpwd" class="error">- Invalid input</div>
              <router-link v-if="false" to="forgotpassword" class="forgotPwd">Forgot?</router-link>
            </div>
            <div class="input-field">
              <a v-on:click="login" href="javascript:void(0);" class="btn btnPrimary waves-effect waves-light">{{action}}</a>
            </div>
            <div class="dLink">
              <router-link to="signup">New? Sign up for an account.</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="islogin" >
      <img src="../assets/images/beellaa-msg.png" alt="" width="100%" height="auto">  
    </div>
  </div>
</template>

<script>
  export default {
  
    data() {
      return {
        haserror: false,
        islogin: false,
        errormsg: '',
        invalidemail: false,
        invalidpwd: false,
        email: '',
        password: '',
        action: 'Login'
      }
    },
    methods: {
  
      initpage() {
        
        if (this.$session.has("userid")) {
          this.islogin = true
        } else {
          this.islogin = false
        }
      
      },
      
      ValidateEmail: function() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
          return (true)
        }
        return (false)
      },

      login: function() {
        
        this.haserror = false
        
        if(!this.email || !this.password || !this.ValidateEmail()){
          
          this.errormsg = "Please enter valid email or password!"
          this.haserror = true
          return 
        }

        var model = this;
        model.action = "Please wait ..."
  
        this.$http.post("user/login", {
  
          email: model.email,
          password: model.password
  
        }).then(function(data) {
  
          data = data.body
  
          if (data['status']) {
  
            data = data.data;
  
            model.errormsg = "Welcome " + data.first_name + "!"
            model.haserror = false;
            this.$session.set('token', data.token)
            this.$session.set('userid', data.id)
            location.reload()

          } else {
  
            model.errormsg = data.message
            model.haserror = true;
          }
  
          model.action = "Login"
  
        });
  
      }
    },
    mounted() {
      this.initpage()
    }
  }
</script>
