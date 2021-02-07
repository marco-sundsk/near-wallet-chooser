# near-wallet-selector
A registry and selection system for all whitelisted near web wallets.


## Why we need a selector of wallets
Generally speaking, one official wallet can not be smoothly accessible from all over the world.   
Beside that, a single wallet can not afford the load balance of more and more request from increasing dapps and their users.  
More than that, some third-party wallets with extral features want to be seen by dapp users.  
So, to build a common, non-intrusive selector of wallets, is the most effective way to solve those issues.

## components
* A registry contract that hold a list of wallets information and the Foundation has the right to manage them;
* A pure frontend web page that fetch and show wallets info from the contract, and redirect request and its parameters to the one user chooses.

## speed up the access of selector itself 
The selector has its static files resident on several CDNs, and can automatically choose the fastest one to load them. All those makes the selector can be accessible world-widely.