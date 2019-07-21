<template>
  <main-layout>
    <token-list
        slot="drawer"
        @active-token-change="handleActiveTokenChange"
        :active-reg-id="null"
        :active-account="activeAccount"
        :active-address="address"
        :network="network"
        :tokens="tokens">
    </token-list>

    <!-- <coin-card
        v-if="activeAccountInfo"
        style="margin: 16px;"
        :show-register-button="!activeAccountInfo.regID"
        name="ela"
        :address="address"
        :value="balance">
    </coin-card> -->

    <coin-card
        style="margin: 16px;"
        :show-register-button="!activeAccountInfo"
        name="ELA"
        :address="address"
        :value="balance">
    </coin-card>

    <template slot="body">
      <trans-history
          @refresh="refreshFunc"
          :transaction="history"
          :show-empty-block="!loading"></trans-history>
    </template>

    <template class="footer" slot="footer">
      <button class="btn-primary" @click="gotoSend">{{ $t('account.main.sendButton') }}</button>
      <button @click="handleReceiveClick">{{ $t('account.main.receiveButton') }}</button>
    </template>
  </main-layout>
</template>

<style scoped lang="scss">
  .button-wrapper {
    > button {
      flex: 1 0 0;
    }

    > button:first-child {
      margin-right: 10px;
    }
  }
</style>

<script type="text/jsx">
  import API from '../api' 
  import { DrawerLayout } from 'vue-drawer-layout'
  import TokenList from './components/token-list'
  import CoinCard from './components/coin-card'
  import TransHistory from './components/trans-history'
  import { openQrCodeDialog } from './dialog'
  import StateWatcher from './state-watcher'
  import MainLayout from './components/main-layout'
  import axios from "axios";

  export default {
    mixins: [StateWatcher],

    components: {
      MainLayout,
      DrawerLayout,
      TokenList,
      CoinCard,
      TransHistory
    },

    created () {
     
     
      // this.eventBus.$on('account:transactions:refresh', this.refresh)

      // this.timer = setInterval(() => {
      //   this.refresh(true)
      // }, 15 * 1000)
      
    },
    mounted(){
      // let wallet = JSON.parse(localStorage.getItem('wallet'));
      let address = JSON.parse(localStorage.getItem('address'));
      // let wallet = JSON.parse(localStorage.getItem('wallet'));
      this.address = address
      this.balance = this.getBalance(this.address);
      this.getHistory(this.address);
      // this.wallet = this.$route.query.wallet;
      // console.log('wallet',this.wallet)
      // console.log(this.$route.query)
    },
    destroyed () {
      this.eventBus.$off('account:transactions:refresh', this.refresh)
      clearInterval(this.timer)
    },

    watch: {
      activeAddress (news,old) {
         console.log('news',news)
         console.log('old',old)
        this.refresh()
      }
    },

    methods: {
      //刷新
      refreshFunc(){
        this.$loading(this.$t('common.loading'))
         axios.get(
          "https://api-wallet-ela.elastos.org/api/1/balance/" + this.address
        ).then(res => {
          this.balance = res.data.result;
          localStorage.setItem("balance", this.balance);
          console.log(this.balance);
        }).catch(res => {
          console.log(res);
        });
        axios.get(
          "https://api-wallet-ela.elastos.org/api/1/history/" + this.address
        ).then(res => {
          this.history = res.data.result.History;
          this.history = this.history.reverse();
          // localStorage.setItem("balance", this.balance);
          console.log('history',this.history);
          this.$loading.close()
        }).catch(res => {
          console.log(res);
          this.$loading.close()
        });
        console.log(123)
      },
      //获取历史交易
      getHistory(address){
        this.$loading(this.$t('common.loading'))
        axios.get(
          "https://api-wallet-ela.elastos.org/api/1/history/" + address
        ).then(res => {
          this.history = res.data.result.History;
          this.history = this.history.reverse();
          // localStorage.setItem("balance", this.balance);
          console.log('history',this.history);
          this.$loading.close()
        }).catch(res => {
          console.log(res);
          this.$loading.close()
        });
      },
      //获取余额
      getBalance(address) {
      this.$loading(this.$t('common.loading'))
      axios.get(
          "https://api-wallet-ela.elastos.org/api/1/balance/" + address
        ).then(res => {
          this.balance = res.data.result;
          localStorage.setItem("balance", this.balance);
          console.log(this.balance);
        }).catch(res => {
          console.log(res);
        });
        
    },
      handleActiveTokenChange (token) {
        if (token) {
          this.$router.push({
            name: 'tokenMain',
            query: {
              name: token.name,
              regId: token.regId
            }
          })
        }
      },

      refresh (silence = false) {
        
        const activeAddress = this.activeAddress;
        console.log('ASDFFF',activeAddress)
        if (!silence) {
          this.$loading(this.$t('common.loading'))
        }

        API.getAccountInfo(this.network, activeAddress).then((info) => {
          if (info && info.regID) {
            info.regID = ('' + info.regID).trim()
          }
          this.activeAccountInfo = info

          if (info.address === null) {
            info.address = activeAddress
            info.balance = 0
          }
          info.balanceText = info.balance ? info.balance * Math.pow(10, -8) : info.balance

          this.$loading.close()

          this.loading = false
        }, () => {
          this.$loading.close()

          this.loading = false
        })

        // return API.getTransHistory(this.network, this.activeAddress).then((value) => {
        //   this.transactions = value
        //   return value
       // })
      },

      gotoSend () {
        this.$router.push({
          name: 'send',
          query: {
            balance: this.activeAccountInfo ? this.activeAccountInfo.balanceText : null
          }
        })
      },

      toggleDrawer() {
        this.$refs.drawerLayout.toggle()
      },
    
      handleReceiveClick () {
        openQrCodeDialog(this.address)
      }
    },

    data () {
      return {
        loading: false,
        address:'',
        activeAccountInfo: null,
        transaction: {
          History: []
        },
        wallet:'',
        balance:0,
        history:[]
      }
    }
  }
</script>
