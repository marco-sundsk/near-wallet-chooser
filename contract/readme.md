Wallet Selector Smart Contract
==================

## Deploy
deploy to selector.testnet  

deploy process:

```shell
near deploy selector.testnet res/selector.wasm --account_id=selector.testnet
near call selector.testnet new '' --account_id=selector.testnet
```

## Check Content

check contents:
```shell
near view selector.testnet get_wallets '{"from_index":0, "limit":100}'
```