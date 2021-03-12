<template>
  <div :class="index">
    <!-- <choose-wallet></choose-wallet> -->
    <div class="container">
      <div class="main">
        <div class="choose">
          <div class="title">Choose a wallet</div>
          <div class="content">
            <ul>
              <li v-for="(item, index) in walletArr" :key="index" @click="goWallet(item)" :class="{ select: item.wallet_name === walletName }">
                <div class="wallet-info">
                  <div class="wallet-logo">
                    <img :src="item.wallet_logo_url" alt="">
                  </div>
                  <div class="wallet-name">{{item.wallet_name}}</div>
                </div>
                <div class="arrow"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initContract } from '../utils/utils.js'
// import ChooseWallet from '@/components/ChooseWallet.vue'
export default {
  name: 'index',
  data () {
    return {
      windowWidth: '',
      walletArr: [],
      walletName: ''
    }
  },
  computed: {
    index () {
      if (this.windowWidth > 500) {
        return 'index'
      } else {
        return 'index-mobile'
      }
    },
    imgUrl () {
      return window.startImgUrl
    }
  },
  methods: {
    getWindowWidth () {
      this.windowWidth = document.documentElement.clientWidth || document.body.offsetWidth
    },
    async getWallet () {
      try {
        const walletArr = await window.contract.get_wallets({ from_index: 0, limit: 100 })
        this.walletArr = walletArr
      } catch (err) {
        console.error(err)
      }
    },
    goWallet (item) {
      window.localStorage.setItem('walletName', item.wallet_name)
      let pathname = window.location.pathname
      if (process.env.VUE_APP_PATH_NAME) {
        pathname = pathname.replace(process.env.VUE_APP_PATH_NAME, '')
      }
      pathname = pathname.slice(1, window.location.pathname.length)
      window.location.href = (item.wallet_url + pathname + window.location.search)
    },
    getWalletName () {
      const name = window.localStorage.getItem('walletName')
      this.walletName = name
    }
  },
  created () {
    const that = this
    initContract()
      .then(() => {
        that.getWallet()
        that.getWalletName()
      })
  },
  mounted () {
    window.addEventListener('resize', () => this.getWindowWidth(), false)
    // window.onresize = this.getWindowWidth
    this.getWindowWidth()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowWidth(), false)
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/index-mobile.less';
  .index {
    width: 100%;
    height: 100%;
    background: url('~@/assets/img/bg-bottom.png') no-repeat right bottom;
    background-size: 412px 113px;
    .container {
      width: 1650px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      align-items: center;
      .main {
        width: 100%;
        height: 678px;
        background: url('~@/assets/img/bg.png') no-repeat;
        background-size: 923px 678px;
        display: flex;
        justify-content: flex-end;
        .bg-img {
          width: 923px;
          height: 678px;
        }
        .choose {
          width: 688px;
          padding-top: 184px;
          .title {
            color: #262d2f;
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 24px;
          }
          .content {
            ul {
              .select {
                border-color: rgb(214, 62, 62);
              }
              li {
                cursor: pointer;
                display: flex;
                width: 632px;
                border-radius: 10px;
                height: 100px;
                background-color: #fafafa;
                padding: 0 20px;
                justify-content: space-between;
                align-items: center;
                border: 1px solid transparent;
                font-size: 30px;
                color: #2c3a3c;
                margin-bottom: 20px;
                box-shadow: 0px 0px 20px 5px #f0f0f0;
                .wallet-info {
                  display: flex;
                  .wallet-logo {
                    display: flex;
                    align-items: center;
                    img {
                      width: 50px;
                      margin-right: 20px;
                    }
                  }
                  .wallet-name {
                    display: flex;
                    align-items: center;
                  }
                }
                .arrow {
                  width: 25px;
                  height: 25px;
                  background: url('~@/assets/img/left-arrow.png') no-repeat center center;
                  background-size: 25px 25px;
                }
              }
            }
          }
        }
      }
      /* background-color: red; */
    }
  }
</style>
