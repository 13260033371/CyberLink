<template>
  <main-layout ref="mainLayout">
    <token-list
        slot="drawer"
        @active-token-change="handleActiveTokenChange"
        :active-reg-id="regId"
        :active-account="activeAccount"
        :active-address="wallet.address  "
        :network="network"
        :tokens="tokens">
    </token-list>

    <!-- <coin-card
        v-if="activeTokenInfo"
        style="margin: 16px;"
        :show-register-button="false"
        :name="name"
        :address="activeAddress"
        :value="activeTokenInfo.FreeValues">
    </coin-card> -->
    <!-- {{dhBalance}} DH
    <button @click="sendDH">充值DH</button> -->
  <coin-card
        v-if="!activeTokenInfo"
        style="margin: 16px;"
        :show-register-button="false"
        name="ETH"
        :address='this.wallet.address'
        :value="balances">
    </coin-card>
    
    <template slot="body">
      <trans-history
          :transactions="transactions"
          :show-empty-block="!loading"></trans-history>
    </template>

    <template slot="footer">
      <button class="btn-primary display-block" @click="gotoSendToken"> 转账 </button>
      <button @click="handleReceiveClick">{{ $t('account.main.receiveButton') }}</button>
    </template>
  </main-layout>
</template>

<style scoped lang="scss">
</style>

<script type="text/jsx">
  import API from '../../api'
  import { DrawerLayout } from 'vue-drawer-layout'
  import TokenList from '../components/token-list'
  import CoinCard from '../components/coin-card'
  import TransHistory from '../components/trans-history'
  import StateWatcher from '../state-watcher'
  import MainLayout from '../components/main-layout'
  import HttpProvider from '../../../../scripts/HttpProvider.js'
  import BigNumber from 'bignumber.js'
  import Vue from 'vue'
  import Web3 from 'web3'
  import { openQrCodeDialog } from '../dialog'
  Vue.prototype.httpProvider = new HttpProvider('http://52.205.30.16:8545');
  export default {
    mixins: [StateWatcher],

    components: {
      DrawerLayout,
      TokenList,
      CoinCard,
      TransHistory,
      MainLayout
    },

    created () {
      const query = this.$router.currentRoute.query
      this.regId = query.regId
      this.name = query.name;
      this.wallet = this.httpProvider.eth.accounts.create();
      
      console.log('this.balance',this.balance) 
      console.log(this.wallet) 
      localStorage.setItem('tokenAddress',this.wallet.address)
      localStorage.setItem('tokenPrivatekey',this.wallet.privateKey)
    },
    mounted(){
      this.getBalance(this.wallet.address);
      this.getdhBalance()
    },
    watch: {
      activeAddress () {
        this.fetchTokenInfo()
      },

      '$route.query.regId' (val) {
        this.regId = val
        this.fetchTokenInfo()
      },

      '$route.query.name' (val) {
        this.name = val
      }
    },

    methods: {
       handleReceiveClick () {
         alert(this.wallet.address)
        openQrCodeDialog(this.wallet.address)
      },
      //充值DH
      sendDH(){
        var Tx = require('ethereumjs-tx');
        var Web3 = require('web3')
        var web3 = new Web3(new Web3.providers.HttpProvider('http://52.205.30.16:8545/'))
         
        // get transaction count, later will used as nonce
        let count = 0;
        let that = this;
        var myAddress = "0x2bFbbdb1812C7Fc00e4Cdda768b1aB0112718Da6"
        var toAddress = "0xE3cce8c22F27384B5Af390cB3E878156CDa45e4E"
        var amount = web3.utils.toHex(1e16)
        console.log('amount',amount)
         
        web3.eth.getTransactionCount(myAddress).then(function(v){
          console.log('v1111111111',v); 
          count = v;
            var privateKey = '0xf59746a7bd81571c18a62dda75c16ecea3eff2a12e61a45e3d94763b3977e088';
       privateKey = Buffer.from(
        privateKey.indexOf("0x") > -1
          ? privateKey.substring(2, privateKey.length)
          : privateKey,
        "hex"
      );
        // Get abi array here https://etherscan.io/address/0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0#code
        var abiArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint128"}],"name":"push","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint128"}],"name":"mint","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"wad","type":"uint128"}],"name":"pull","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint128"}],"name":"burn","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"guy","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"symbol_","type":"bytes32"}],"payable":false,"type":"constructor"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]
        // Here you may get the abicode from a string or a file, here is a string case
        // var abiArray = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint128"}],"name":"push","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint128"}],"name":"mint","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"wad","type":"uint128"}],"name":"pull","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint128"}],"name":"burn","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"guy","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"symbol_","type":"bytes32"}],"payable":false,"type":"constructor"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]', 'utf-8')

        var contractAddress = '0x40fd222573e94c62599531ad4ac5c141a8a08768'
        var contract = new web3.eth.Contract(abiArray, contractAddress, {from: myAddress})
        console.log('contract',contract) 
        v+=that.count;
        console.log('count',v)
        console.log('this.count',that.count)
        let gasPrice = web3.eth.getGasPrice((res)=>{
            console.log(res)
        });
        console.log('gasPrice111111w',gasPrice)
        var rawTransaction = {
          "from":myAddress,
          "gasPrice":20000000000,
          "gasLimit":web3.utils.toHex(210000),
          "to":contractAddress,
          "data":contract.methods.transfer(toAddress, amount).encodeABI(),
          "nonce":web3.utils.toHex(v)} 
        console.log('rawTransaction',rawTransaction)
        var transaction = new Tx(rawTransaction)
        console.log('transaction',transaction)
        transaction.sign(privateKey)
         let tran = web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
        that.count = 0;
        tran.on('confirmation', (confirmationNumber, receipt) => {
          //console.log('confirmation: ' + confirmationNumber);
        });
        tran.on('transactionHash', hash => {
            console.log('hash');
            console.log(hash);
        });
        tran.on('receipt', receipt => {
            console.log('receipt:');
            console.log(receipt);
        });
        tran.on('error', (err)=>{
            console.log(err);        
        });
       return false;
        try{
        
        // let tran = web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
        // that.count = 0;
        // tran.on('confirmation', (confirmationNumber, receipt) => {
        //   //console.log('confirmation: ' + confirmationNumber);
        // });
        // tran.on('transactionHash', hash => {
        //     console.log('hash');
        //     console.log(hash);
        // });
        // tran.on('receipt', receipt => {
        //     console.log('receipt:');
        //     console.log(receipt);
        // });
        // tran.on('error', (err)=>{
        //     console.log(err);        
        // });

        // check the balance
        let bal = ''
        contract.methods.balanceOf('0x3e8c6c288aE86d249789d35daF0B66bacF9A20f7').call().then(function(balance){
          console.log('balance1112',balance)
          bal = balance
          })
          console.log(new BigNumber(web3.fromWei(bal)))
        } catch(error){
            if(that.count < 5){
              that.count++;
             
              that.confirmSend();
              console.log('count',that.count)
            }else{
              this.$toast('交易处理异常！')
            }
        }
          }) 
        
      },
      //获取DH余额
      getdhBalance(){
        var abiArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint128"}],"name":"push","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint128"}],"name":"mint","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"wad","type":"uint128"}],"name":"pull","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint128"}],"name":"burn","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"guy","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"symbol_","type":"bytes32"}],"payable":false,"type":"constructor"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]
        var contractAddress = '0x40fd222573e94c62599531ad4ac5c141a8a08768'
        let Web3 = require('web3')
        let web3 = new Web3(new Web3.providers.HttpProvider('http://52.205.30.16:8545/'))
        let bal= '';
        let that = this;
        var contract = new web3.eth.Contract(abiArray, contractAddress, {from: this.wallet.address})
        contract.methods.balanceOf(this.wallet.address).call().then(function(balance){
        

        bal = web3.utils.hexToNumberString(balance)
        that.dhBalance = balance
        console.log('balance1112',bal)
        })
     
        // bal.indexOf("0x") > -1
        //   ? bal.substring(2, bal.length)
        //   : bal
        this.dhBalance = bal
        console.log('????????????????????',bal)
      },
      //获取余额
      getBalance(address){
        let that = this;
        console.log('addresssssssss',address)  
        this.httpProvider.eth.getBalance(address).then(function(balance){
        console.log('balance:1111111111111',balance)
        //  balance = new BigNumber(balance);
         
        console.log('balance:',balance)
         that.balances =  balance
    }).then(()=>{
        // that.balance =  balance;
         that.balances = that.httpProvider.utils.fromWei(that.balances, 'ether');
    })
      },
      handleActiveTokenChange (token) {
        if (!token) {
          this.$router.push({
            name: 'accountMain'
          })
        } else {
          this.$router.push({
            name: 'tokenMain',
            query: {
              name: token.name,
              regId: token.regId
            }
          })

          this.$refs.mainLayout.toggleDrawer()
        }
      },

      fetchTokenInfo () {
        this.loading = true
        this.$loading(this.$t('common.loading'))
        API.getTokenInfo(this.network, this.activeAddress, this.regId).then((value) => {
          const tokenInfo = value.result
          if (tokenInfo && tokenInfo.FreeValues) {
            tokenInfo.FreeValues = tokenInfo.FreeValues * Math.pow(10, -8)
          }
          this.activeTokenInfo = tokenInfo
          this.$loading.close()
          this.loading = false
        }, (error) => {
          this.$loading.close()
          this.loading = false
        })

        // API.getTokenTransHistory(this.network, this.activeAddress, this.regId).then((value) => {
        //   // console.log('token trans:', value)
        //   this.transactions = value
        // })
      },

      gotoSendToken () {
        this.$router.push({
          name: 'sendToken',
          query: {
            from: this.wallet.adderss,
            network: this.network,
            name: 'DH',
            regId: '123',
            balance: this.balance
          }
        })
      },
    },

    data () {
      return {
        loading: false,
        regId: null,
        name: null,
        balance:'',
        transactions: null,
        activeTokenInfo: null,
        wallet:'',
        balances:'',
        dhBalance:'',
        count:0,
      }
    }
  }
</script>
