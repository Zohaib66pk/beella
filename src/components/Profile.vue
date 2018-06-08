<template>
  <div id="profile">
    <div v-if="haserror" class="errorMsg">{{errormsg}}</div>
  
    <div class="contentPanel">
      <div class="titlePanel">
        <div class="titleBar">Edit Profile</div>
      </div>
      <div class="loginWrap profileWrap">
  
        <div class="loginPanel">
          <div class="userImage"></div>
          <form action="#">
            <div class="infoWrap">
              <div class="left label">Email:</div>
              <div class="left labelVal">{{email}}</div>
            </div>
            <div class="infoWrap">
              <div class="left label">First Name :</div>
              <div class="left labelVal">{{fname}}</div>
            </div>
            <div class="infoWrap">
              <div class="left label">Last Name :</div>
              <div class="left labelVal">{{lname}}</div>
            </div>
            <div class="infoWrap">
              <div class="left label">City :</div>
              <div class="left labelVal">{{city}}</div>
            </div>
            <div class="infoWrap">
              <div class="left label">Country :</div>
              <div class="left labelVal">{{country}}</div>
            </div>
            <div class="infoWrap">
              <div class="left label">Lattitude :</div>
              <div class="left labelVal">{{lat}}</div>
            </div>
            <div class="infoWrap">
              <div class="left label">Language:</div>
              <div class="left labelVal">{{lang}}</div>
            </div>
            <div class="input-field">
              <router-link to="editprofile" class="btn btnPrimary waves-effect waves-light">Edit profile</router-link>
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
        haserror: false,
        errormsg: '',
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
        lang: '',
      }
    },
    mounted() {
      this.initpage()
    },
    methods: {
      
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
            model.lang = data.lang
  
          } else {
  
            model.haserror = true
            model.errormsg = data.message
          }
  
        })
      }
    }
  }
</script>

