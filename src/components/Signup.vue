<template>
  <div id="signup">
    <div v-if="haserror" class="errorMsg">{{errormsg}}</div>
    <div v-if="regsuccess" class="successMsg"><strong>Congratulations!</strong> You are successfully registered</div>
  
    <div class="loginWrap">
  
      <div class="loginPanel">
        <div class="brandLogo"></div>
        <form action="">
          <div class="input-field">
            <input placeholder="First name" v-on:keyup.enter="register" v-model="fname" id="fName" type="text" class="validate">
          </div>
          <div class="input-field">
            <input placeholder="Last name" v-on:keyup.enter="register" v-model="lname" id="lName" type="text" class="validate">
          </div>
          <div class="input-field">
            <input placeholder="Phone" v-on:keyup.enter="register" v-model="phone" id="phone" type="text" class="validate">
          </div>
          <div class="input-field">
            <input placeholder="User type" v-on:keyup.enter="register" v-model="utype" id="utype" type="text" class="validate">
          </div>
          <div class="input-field">
            <input placeholder="Email" v-on:keyup.enter="register" v-model="email" id="email" type="text" class="validate">
          </div>
          <div class="input-field">
            <input placeholder="Password" v-on:keyup.enter="register" v-model="pwd" id="pwd" type="password" class="validate">
          </div>
          <div v-if="utype==2" class="input-field">
            <input placeholder="Business name" v-on:keyup.enter="register" v-model="bname" id="bname" type="text" class="validate">
          </div>
          <div class="input-field">
            <a v-on:click="register" href="javascript:void(0);" class="btn btnPrimary waves-effect waves-light">{{action}}</a>
          </div>
          <div class="dLink">
            <router-link to="login">Already a user? Log in.</router-link>
          </div>
        </form>
      </div>
  
  
    </div>
  </div>
</template>

<script>
  export default {
  
    data() {
      return {
        haserror: false,
        errormsg: '',
        regsuccess: false,
        action: 'Sign Up!',
        fname: '',
        lname: '',
        phone: '',
        utype: '',
        email: '',
        pwd: '',
        bname: ''
      }
    },
    methods: {
      validateNumber () {
        
        if(!this.phone || isNaN(this.phone)){
          this.errormsg = "Inavlid Phone Number!"
          this.haserror = true
          return false;
        }

        return true
      },
      ValidateEmail: function() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
          return (true)
        }
        return (false)
      },
      register: function() {
        this.haserror = false          

        if(!this.validateNumber()){
          return;
        } 

        if (!this.email || this.ValidateEmail() === false) {
          this.errormsg = "Enter valid email!"
          this.haserror = true
          return false
        }
  
        var model = this;
        model.action = "Please wait ..."
  
        this.$http.post("user/register", {
  
          first_name: model.fname,
          last_name: model.lname,
          phone: model.phone,
          user_type: model.utype,
          email: model.email,
          password: model.pwd,
          business_name: model.bname
  
        }).then(function(data) {
  
          data = data.body
  
          if (data['status']) {
  
            model.haserror = false
            model.regsuccess = true
            this.$router.push('/login')
  
          } else {
  
            model.errormsg = data.message
            model.haserror = true;
          }
  
          model.action = "Sign Up!"
  
        });
  
      }
    }
  
  
  }
</script>

