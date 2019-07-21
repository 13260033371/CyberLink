<template>
  <nav-layout
    :title="$t('wallet.create.backup.title')"
    :path="backPath"
    class="u-full-height">
    <div class="warning-container">
      <div class="tip-title">{{ $t('common.warning') }}</div>
      <div class="tip-content">{{ $t('wallet.import.tip') }}</div>
      <div class="tip-content">{{ $t('wallet.create.backup.tip') }}</div>
    </div>

    <wallet-input
        v-model="mnemonic"
        :label="$t('wallet.create.backup.mnemonicLabel')"
        type="textarea"
        read-only></wallet-input>

    <template slot="footer">
      <button class="display-block btn-primary" @click="validateWalletMnemonic">{{ $t('wallet.create.backup.nextButton') }} </button>
      <button class="display-block btn-text" @click="download"><img src="../../static/download.svg" />  {{ $t('wallet.create.backup.downloadButton') }}</button>
    </template>
  </nav-layout>
</template>

<style lang="scss" scoped>
   @import './warning.scss';
</style>

<script type="text/jsx">
  import WalletInput from '../../components/input'
  import NavLayout from '../../components/nav-layout'
  import download from '../../api/download'
  // import mnemonic from './mnemonic'
  import mnemonic from '../../../../scripts/elastos-wallet-api'
  export default {
    name: 'backup-mnemonic',

    components: {
      NavLayout,
      WalletInput
    },

    created () {
      const route = this.$router.currentRoute
      const { password } = route.query
      if (password) {
        this.password = password
      }

      if (route && route.path) {
        this.isCreatingWallet = route.path.indexOf('wallet') !== -1
      }

      // mnemonic.get().then((data) => {
      //   console.log('data',data)
      //   this.mnemonic = data
      // }, (error) => {
      //   console.log('get mnemonic error:', error.message)
      // })
      let lang = navigator.systemLanguage ? navigator.systemLanguage : navigator.language;
      console.log(lang)  
      let langs = lang.substr(0, 2); //获取lang字符串的前两位
      let localStorage_language = localStorage.getItem('WALLET_LANGUAGE')
      if(localStorage_language){
          localStorage_language = localStorage_language.substr(0, 2); 
      }
      console.log(localStorage_language)
      if(localStorage_language == 'zh'){
        var mnem = window.generateMnemonic('cn');
      } else if (localStorage_language == "en") {
        var mnem = window.generateMnemonic();
      }else if (langs == "zh") {
        var mnem = window.generateMnemonic('cn');
      } else {
        var mnem = window.generateMnemonic();
      }
     
      this.mnemonic = mnem
      console.log('mnemonic',mnem)
    },

    computed: {
      backPath () {
        if (this.isCreatingWallet) {
          return {
            name: 'createWallet'
          }
        } else {
          return {
            name: 'welcome'
          }
        }
      }
    },

    methods: {
      validateWalletMnemonic () {
        if (this.isCreatingWallet) {
          this.$router.push({
            name: 'validateWalletMnemonic',
            query: {
              mnemonic: this.mnemonic,
              password: this.password
            }
          })
        } else {
          this.$router.push({
            name: 'validateAccountMnemonic',
            query: {
              mnemonic: this.mnemonic
            }
          })
        }
      },

      download () {
        download('ela-seed.txt', this.mnemonic)
      }
    },

    data () {
      return {
        isCreatingWallet: true,
        mnemonic: '',
        password: null
      }
    }
  }
</script>
