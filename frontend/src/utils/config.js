/*
 * @Author: your name
 * @Date: 2021-02-15 17:17:51
 * @LastEditTime: 2021-02-15 17:18:01
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /swap-select/src/utils/config.js
 */
// const CONTRACT_NAME = process.env.CONTRACT_NAME ||'demo4selector'
// dev-1612856092888-7642477
const CONTRACT_NAME = 'dev-1612856092888-7642477'
function getConfig (env) {
  switch (env) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        explorerUrl: 'https://explorer.mainnet.near.org'
      }
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org'
      }
    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`)
  }
}

module.exports = getConfig
