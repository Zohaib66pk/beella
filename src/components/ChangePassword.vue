<template>
  <div id="changepassword">
    <div v-if="haserror" class="errorMsg">{{errormsg}}</div>
    <div v-if="regsuccess" class="successMsg"><strong>Congratulations!</strong> Your password successfully updated.</div>

    <div class="contentPanel">
      <div class="titlePanel">
        <div class="titleBar">Change Password</div>
      </div>
      <div class="loginWrap profileWrap">
  
        <div class="loginPanel">
          <br />
          <form action="#">
            <div class="input-field">
              <input placeholder="Current password" v-on:keyup.enter="updatepwd" v-model="oldpwd" id="cpwd" type="password" class="validate">
            </div>
            <div class="input-field">
              <input placeholder="New password" v-on:keyup.enter="updatepwd" v-model="newpwd" id="npwd" type="password" class="validate">
            </div>
            <div class="input-field">
              <input placeholder="Confirm password" v-on:keyup.enter="updatepwd" v-model="confirmpwd" id="conpwd" type="password" class="validate">
            </div>
            <div class="input-field">
              <a v-on:click="updatepwd" href="javascript:void(0);" class="btn btnPrimary waves-effect waves-light">{{action}}</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        haserror: '',
        errormsg: '',
        regsuccess:'',
        action: 'Change Password',
        oldpwd: '',
        newpwd: '',
        confirmpwd: '',
  
      }
    },
    methods: {
  
      initpage() {
  
        if (this.$session.has("userid") == false) {
          this.$router.push("/login")
          return
        }
  
      },
  
      updatepwd() {
        
        this.haserror = false

        if (this.confirmpwd === this.newpwd) {
  
          var model = this
          model.action = "Please wait ..."
          let token = 'Bearer ' + this.$session.get("token")
          let userid = this.$session.get("userid")
          const auth = {
  
            headers: {
              'Authorization': token
            }
          }
  
          let url = "user/password"
          this.$http.put(url, {
  
            'user_id': userid,
            'old-password': model.oldpwd,
            'password': model.newpwd
  
  
          }, auth).then(function(data) {
            data = data.body
            console.log(data)
            if (data['status'] === true) {
              model.action = "Password Updated"
              model.errormsg = false
              model.regsuccess = true
            } else {
              model.haserror = true
              model.errormsg = data.message
              model.action = "Update Password"
              
            }
          })
        }else {
          this.haserror = true
          this.errormsg = "New and confrim password mismatched!"
        }
  
  
      }
    },
    mounted() {
      this.initpage()
    }
  }
</script>

