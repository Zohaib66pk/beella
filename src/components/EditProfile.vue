<template>
  <div class="contentPanel">
    <div v-if="haserror" class="errorMsg">{{errormsg}}</div>
    <div v-if="regsuccess" class="successMsg"><strong>Congratulations!</strong> Your profile successfully updated.</div>
  
    <div class="titlePanel">
      <div class="titleBar">Edit Profile</div>
    </div>
    <div class="loginWrap profileWrap">
  
      <div class="loginPanel">
        <div class="userImage"><a href="#"><i class="right fa fa-pencil"></i></a></div>
        <form action="#">
          <div class="input-field">
            <input placeholder="email" v-on:keyup.enter="updteprofile" v-model="email" disabled id="email" type="text" class="validate">
          </div>
          <div class="input-field">
            <input placeholder="first name" v-on:keyup.enter="updteprofile" v-model="fname" id="fName" type="text" class="validate">
          </div>
          <div class="input-field">
            <input placeholder="last name" v-on:keyup.enter="updteprofile" v-model="lname" id="lName" type="text" class="validate">
          </div>
          <div class="input-field">
            <input placeholder="phone" v-on:keyup.enter="updteprofile" v-model="phone" id="phone" type="text" class="validate">
          </div>
          <div class="input-field">
            <input placeholder="city" v-on:keyup.enter="updteprofile" v-model="city" id="city" type="text" class="validate">
          </div>
          <div class="input-field">
            <input placeholder="country" v-on:keyup.enter="updteprofile" v-model="country" id="country" type="text" class="validate">
          </div>
          <div class="input-field">
            <input placeholder="lattitude" v-on:keyup.enter="updteprofile" v-model="lat" id="lat" type="text" class="validate">
          </div>
          <div class="input-field">
            <input placeholder="language" v-on:keyup.enter="updteprofile" v-model="lng" id="lng" type="text" class="validate">
          </div>
          <div class="input-field">
            <a v-on:click="updteprofile"  href="javascript:void(0);" class="btn btnPrimary waves-effect waves-light">{{action}}</a>
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
        action: 'Update Profile',
        regsuccess: false,
        auth: '',
        userid: '',
        email: '',
        fname: '',
        lname: '',
        phone: '',
        city: '',
        country: '',
        photourl: '',
        lat: '',
        lng: '',
      }
    },
    mounted() {
      this.initpage()
    },
    methods: {
      ValidateEmail: function() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
          return (true)
        }
        return (false)
      },
      initpage: function() {
        
        if(this.$session.has("userid") == false){
          this.$router.push("/login")
          return
        }

        let token = 'Bearer ' + this.$session.get("token")
        const auth = {
          headers: {
            'Authorization': token
          }
        }
  
        let url = "user/" + this.$session.get("userid") + "/detail"
        var model = this
        this.$http.get(url, auth).then(function(data) {
  
          console.log(data.body)
          data = data.body
          if (data['status'] === true) {
  
            data = data.data
            model.email = data.email
            model.fname = data.first_name
            model.lname = data.last_name
            model.phone = data.phone
            model.city = data.city
            model.country = data.country
            model.lat = data.lat
            model.lng = data.lng
  
          } else {
  
            model.haserror = true
            model.errormsg = data.message
          }
  
        })
      },
  
      updteprofile: function() {
  
        this.haserror = false

        var model = this
        model.action = "Please wait"
        let token = 'Bearer ' + this.$session.get("token")
        let userid = this.$session.get("userid")
        const auth = {
  
          headers: {
            'Authorization': token
          }
        }
  
        let url = "user/update"
        this.$http.put(url, {
  
          user_id: userid,
          email: model.email,
          first_name: model.fname,
          last_name: model.lname,
          phone: model.phone,
          city: model.city,
          country: model.country,
          lat: model.lat,
          lng: model.lng
  
  
        }, auth).then(function(data) {
          data = data.body
          console.log(data)
          if (data['status'] === true) {
            model.action = "Profile Updated"
            model.regsuccess = true
            model.errormsg = false
            this.$router.push('/profile')
          } else {
            model.haserror = true
            model.errormsg = data.message
  
          }
        })
      }
    }
  }
</script>


