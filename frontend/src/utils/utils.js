/*
 * @Author: your name
 * @Date: 2021-02-15 17:17:45
 * @LastEditTime: 2021-02-18 11:39:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /swap-select/src/utils/utils.js
 */
import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'

// Initialize contract & set global variables
export async function initContract () {
  const nearConfig = getConfig(process.env.NODE_ENV || 'development')
  // Initialize connection to the NEAR testnet  InMemoryKeyStore
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.InMemoryKeyStore() } }, nearConfig))
  // const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['get_greeting', 'get_wallets']
  })
}
