/*
 * @Author: your name
 * @Date: 2021-02-15 17:17:45
 * @LastEditTime: 2021-02-15 18:14:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /swap-select/src/utils/index.js
 */
import 'regenerator-runtime/runtime'

import { initContract } from './utils'

// import getConfig from './config'
// const { networkId } = getConfig(process.env.NODE_ENV || 'development')

// global variable used throughout
// let currentGreeting

// Displaying the signed in flow container and fill in account-specific data
// function signedInFlow () {
//   document.querySelector('#signed-in-flow').style.display = 'block'

//   fetchWallets()
// }

// // update global currentGreeting variable; update DOM with it
// // async function fetchGreeting () {
// //   currentGreeting = await window.contract.get_greeting({ account_id: 'shenzhen.testnet' })
// //   document.querySelectorAll('[data-behavior=greeting]').forEach(el => {
// //     // set divs, spans, etc
// //     el.innerText = currentGreeting
// //   })
// // }

// async function fetchWallets () {
//   currentGreeting = await window.contract.get_wallets({ from_index: 0, limit: 100 })
//   document.querySelectorAll('[data-behavior=greeting]').forEach(el => {
//     // set divs, spans, etc
//     el.innerText = JSON.stringify(currentGreeting)
//   })
// }

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
  .then(() => {
    // signedInFlow()
  })
  .catch(console.error)
