import Web3 from 'web3'

class HttpProvider {
  constructor (url) {
    if (typeof this.httpProvider !== 'undefined') {
      this.httpProvider = new Web3(this.httpProvider.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      this.httpProvider = new Web3(new Web3.providers.HttpProvider(url));
    }
    return this.httpProvider
  }
}
export default HttpProvider
