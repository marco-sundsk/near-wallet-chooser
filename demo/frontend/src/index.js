import 'regenerator-runtime/runtime'

import {initContract} from './utils'

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

// global variable used throughout
let currentGreeting

// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  document.querySelector('#signed-in-flow').style.display = 'block'

  fetchWallets()
}

// update global currentGreeting variable; update DOM with it
async function fetchGreeting() {
  currentGreeting = await contract.get_greeting({ account_id: "shenzhen.testnet" })
  document.querySelectorAll('[data-behavior=greeting]').forEach(el => {
    // set divs, spans, etc
    el.innerText = currentGreeting

  })
}

async function fetchWallets() {
  currentGreeting = await contract.get_wallets({ from_index: 0, limit: 100 })
  document.querySelectorAll('[data-behavior=greeting]').forEach(el => {
    // set divs, spans, etc
    el.innerText = JSON.stringify(currentGreeting)

  })
}

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
  .then(() => {
    signedInFlow()
  })
  .catch(console.error)
