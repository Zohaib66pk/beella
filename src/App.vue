<template>
  <div id="app">
    <PageHeader></PageHeader>
    <router-view></router-view>
  </div>
</template>

<script>

  import PageHeader from './components/PageHeader.vue'
  import Login from './components/Login.vue'

  export default {
    name: 'app',
    data() {
      return {
      }

    },
    components: {
      PageHeader,
      Login
    }
  }
</script>
