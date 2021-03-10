# near-wallet-select frontend

## Project setup
```
yarn install
```

### Make production

modify .env to satisfy deployment env.
```shell
vim .env
```

especially, this project support multiple (up to 5) CDNs, you should put their base url into .env and leave empty for those unused.  

then do build action:
```shell
yarn build
```

Now, all stuff is in dist dir, and just leave `index.html` on the deploy-server and others should be distributed to CDNs.

