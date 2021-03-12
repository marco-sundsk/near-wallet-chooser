<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view></router-view>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import { initContract } from './utils/utils.js'
export default {
  data () {
    return {
      showRouter: false
    }
  },
  async created () {
    let pathname = window.location.pathname
    if (process.env.VUE_APP_PATH_NAME) {
      pathname = pathname.replace(process.env.VUE_APP_PATH_NAME, '')
    }
    pathname = pathname.slice(1, window.location.pathname.length)
    window.myUrl = pathname + window.location.search
    await initContract()
  }
}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}

/* #nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
