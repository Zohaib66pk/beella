<template>
  <div id="forgot-password">
    <div class="errorMsg">Something wrong while submiting the form</div>
    <div class="successMsg">Recovery email has been sent successfully</div>
  
    <div class="loginWrap">
  
      <div class="loginPanel">
        <div class="brandLogo"></div>
        <form action="#">
          <p>Please provide a valid recovery email address</p>
          <div class="input-field">
            <input placeholder="Email" id="email" type="text" class="validate">
          </div>
          <div class="input-field">
            <a href="#" class="btn btnPrimary waves-effect waves-light">Send recovery email</a>
          </div>
          <div class="dLink"><a href="login.html">Back to login.</a></div>
        </form>
      </div>
  
  
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>
