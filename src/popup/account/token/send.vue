<template>
  <div class="content-wrapper">
    <nav-bar :title="$t('account.sendToken.title')"></nav-bar>
    <div class="content-body">
      <div class="from-title">{{ $t('account.sendToken.fromLabel') }}</div>
      <div class="from-address">{{address}}</div>
      <label
        class="transfer-limit"
      >{{$t('account.')}}&nbsp;{{balance}} &nbsp;ETH</label>

      <wallet-input
        v-model="destAddr"
        :label="$t('account.sendToken.destLabel')"
        :placeholder="$t('account.sendToken.destPlaceHolder')"
      ></wallet-input>

      <wallet-input
        v-model="amount"
        type="number"
        postfix="ETH"
        :label="$t('account.sendToken.valueLabel')"
        :placeholder="$t('account.sendToken.valuePlaceHolder')"
      ></wallet-input>

      <wallet-input v-model="desc" :label="$t('account.sendToken.descLabel')"></wallet-input>
      <!-- <fees-slider type="call-contract" v-model="fees"></fees-slider> -->
    </div>

    <div class="content-footer">
      <button
        :disabled="!valid"
        class="display-block btn-primary"
        @click="confirmSend"
      >{{ $t('account.sendToken.confirmButton') }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.content-body {
  flex: 1 0 0;
  padding: 0 16px 7px;
  position: relative;
}
.transfer-limit {
  position: absolute;
  display: inline-block;
  top: 167px;
  right: 17px;
  z-index: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(165, 174, 193, 1);
}
.content-footer {
  padding: 0 16px;
}

.from-title,
.from-address {
  color: #717680;
  font-size: 15px;
  padding: 2px;
}

.from-address {
  margin-bottom: 10px;
}
</style>

<script type="text/jsx">
import WalletInput from "../../components/input";
import NavBar from "../../components/nav-bar";
import FeesSlider from "../../components/fees-slider";
import API from "../../api";
import formatError from "../../api/format-error";
import StateWatcher from "../state-watcher";
import HttpProvider from '../../../../scripts/HttpProvider.js'
import BigNumber from 'bignumber.js'
import Vue from 'vue'
import Web3 from 'web3'
// import TradingFuns from "@/asserts/js/TradingFuns.js";
Vue.prototype.httpProvider = new HttpProvider('http://52.205.30.16:8545');
export default {
  name: "send-token",

  mixins: [StateWatcher],

  components: {
    WalletInput,
    FeesSlider,
    NavBar
  },

  props: {
    regId: {
      type: String,
      required: true
    },
    name: {
      type: String
    }
  },
  created() {
    const { query } = this.$router.currentRoute;

    if (query.balance && !isNaN(parseFloat(query.balance))) {
      this.balance = parseFloat(query.balance);
    } else {
      this.balance = 0;
    }
  },
  mounted() {
    this.address = localStorage.getItem("tokenAddress");
    this.privatekey = localStorage.getItem("tokenPrivatekey");
  },
  computed: {
    valid() {
      return this.destAddr && this.amount;
    }
  },

  methods: {
    confirmSend(params) {
        
        var Tx = require('ethereumjs-tx');
        var Web3 = require('web3')
        var web3 = new Web3(new Web3.providers.HttpProvider('http://52.205.30.16:8545/'))
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
        console.log('this.amount',that.amount)
        var rawTransaction = {
          "from":myAddress,
          "gasPrice":20000000000,
          "gasLimit":web3.utils.toHex(210000),
          "to":that.destAddr,
          "value": web3.utils.toHex(new BigNumber(that.amount * 1e18)),
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


        // web3.eth.accounts.signTransaction({
        //     to: '0xE3cce8c22F27384B5Af390cB3E878156CDa45e4E',
        //     value: web3.utils.toHex(new BigNumber(7* 1e18)),
        //     gas: 2000000
        // }, '0xf59746a7bd81571c18a62dda75c16ecea3eff2a12e61a45e3d94763b3977e088')
        // .then(console.log);


    return false
       //导入ethereumjs-tx库，通过npm install安装
        var Tx = require('ethereumjs-tx');
        //_from为发起交易的地址
        var _from = "0x2bFbbdb1812C7Fc00e4Cdda768b1aB0112718Da6";
       //nonce随机数，这里取该账号的交易数量
        var number =  this.httpProvider.eth.getTransactionCount(_from).toString(16);
        // var privateKey = new Buffer('0xf59746a7bd81571c18a62dda75c16ecea3eff2a12e61a45e3d94763b3977e088', 'hex');
       var privateKey = '0xf59746a7bd81571c18a62dda75c16ecea3eff2a12e61a45e3d94763b3977e088';
       privateKey = Buffer.from(
        privateKey.indexOf("0x") > -1
          ? privateKey.substring(2, privateKey.length)
          : privateKey,
        "hex"
      );
        var rawTx = {
            nonce: '0x'+number,//随机数
           //gasPrice和gasLimit如果不知道怎么填，可以参考etherscan上的任意一笔交易的值
            gasPrice: '0x77359400',
            gasLimit: '0x295f05',
            gas:2000000,
            to: '0xE3cce8c22F27384B5Af390cB3E878156CDa45e4E',//接受方地址或者合约地址
            value: web3.utils.toHex(new BigNumber(2 * 1e18)),//发送的金额，这里是16进制，实际表示发送256个wei
        }

        //使用私钥对原始的交易信息进行签名，得到签名后的交易数据
        var tx = new Tx(rawTx);
        console.log('tx',tx)
        tx.sign(privateKey);

        var serializedTx = tx.serialize();
        console.log('serializedTx',serializedTx)
        console.log(this.httpProvider.eth.sendSignedTransaction)
        
         this.httpProvider.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
            if (!err){
                console.log(hash);
            }else{
                console.log(err);
            }
        });

        return false
        // var tran = this.httpProvider.eth.sendSignedTransaction('0x' + serializedTx);
        //     tran.on('confirmation', (confirmationNumber, receipt) => {
        //       //console.log('confirmation: ' + confirmationNumber);
        //     });
        //     tran.on('transactionHash', hash => {
        //         console.log('hash');
        //         console.log(hash);
        //     });
        //     tran.on('receipt', receipt => {
        //         console.log('receipt:');
        //         console.log(receipt);
        //     });
        //     tran.on('error', (err)=>{
        //         //alert('出现错误请查看控制台');
        //         console.log(err);        
        //     });
        var result = this.httpProvider.eth.call({
            to: "0x40fd222573e94c62599531ad4ac5c141a8a08768", 
            data: "0x70a082310000000000000000000000000x2bFbbdb1812C7Fc00e4Cdda768b1aB0112718Da6"
        });
      console.log('result',result); // "0x0000000000000000000000000000000000000000000000000000000000000015"
        return false;
       this.$loading(this.$t("account.sendToken.confirmLoading"));
       this.httpProvider.eth.accounts.signTransaction({
            to: "0xE3cce8c22F27384B5Af390cB3E878156CDa45e4E",
            value: "100000000000000000000",
            gas: 20000000000,
            gasPrice: "234567897654321",
            nonce: 0,
            chainId: 1
          },"0xf59746a7bd81571c18a62dda75c16ecea3eff2a12e61a45e3d94763b3977e088").then((res)=>{
            console.log(res)
          });
        
     
      // sendToken (network, address, name, regId, destAddress, amount, fees, desc)
      // API.sendToken(this.network || 'testnet', this.activeAddress, this.name, this.regId, this.destAddr, parseFloat(this.amount), this.fees, this.desc)
      //   .then(() => {
      //     this.$toast(this.$t('account.sendToken.sendSuccess'), {
      //       type: 'center'
      //     })
      //     this.$loading.close()

      //     window.history.go(-1)
      //   }, (error) => {
      //     this.$toast(this.$t('account.sendToken.sendFailure') + ' ' + formatError(error), {
      //       type: 'center',
      //       duration: 5000,
      //       wordWrap: true
      //     })
      //     this.$loading.close()
      //   })
      this.$loading.close();
    }
  },

  data() {
    return {
      destAddr: '',
      amount: null,
      desc: null,
      fees: 0.01,
      balance: "",
      address: "",
      privatekey: "",
      count:0,
    };
  }
};
</script>
