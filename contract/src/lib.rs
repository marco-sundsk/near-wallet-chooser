/*
 * This is an example of a Rust smart contract with two simple, symmetric functions:
 *
 * 1. set_greeting: accepts a greeting, such as "howdy", and records it for the user (account_id)
 *    who sent the request
 * 2. get_greeting: accepts an account_id and returns the greeting saved for it, defaulting to
 *    "Hello"
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://github.com/near/near-sdk-rs
 *
 */

// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::wee_alloc;
use near_sdk::{env, near_bindgen};
use near_sdk::serde::{Deserialize, Serialize};
use std::collections::HashMap;
use near_sdk::collections::UnorderedMap;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
pub struct WalletInfo {
    pub wallet_name: String,
    pub wallet_url: String,
    pub wallet_logo_url: String,
}

impl Default for WalletInfo {
    fn default() -> Self {
        Self {
            wallet_name: String::from(""),
            wallet_url: String::from(""),
            wallet_logo_url: String::from(""),
        }
    }
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct HumanReadableWalletInfo {
    pub wallet_name: String,
    pub wallet_url: String,
    pub wallet_logo_url: String,
}

// Structs in Rust are similar to other languages, and may include impl keyword as shown below
// Note: the names of the structs are not important when calling the smart contract, but the function names are
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Welcome {
    wallets: UnorderedMap<String, WalletInfo>,
}

impl Default for Welcome {
    fn default() -> Self {
        env::panic(b"This contract should be initialized before usage")
    }
}

#[near_bindgen]
impl Welcome {
    #[init]
    pub fn new() -> Self {
        assert!(!env::state_exists(), "Already initialized");
        let mut this = Self {
            wallets: UnorderedMap::new(b"w".to_vec()),
        };
        this.wallets.insert(&String::from("official"), 
        &WalletInfo {
            wallet_name: String::from("official"),
            wallet_url: String::from("https://wallet.near.org/"),
            wallet_logo_url: String::from("official-wallet.png"),
        });
        this.wallets.insert(&String::from("buildlinks"), 
        &WalletInfo {
            wallet_name: String::from("buildlinks"),
            wallet_url: String::from("https://near-wallet.buildlinks.org/"),
            wallet_logo_url: String::from("buildlinks-wallet.png"),
        });
        this
    }

    pub fn set_wallet(&mut self, wallet_info: HumanReadableWalletInfo) {

        let mut record = self.wallets.get(&wallet_info.wallet_name).unwrap_or_default();
        record.wallet_name = wallet_info.wallet_name;
        record.wallet_url = wallet_info.wallet_url;
        record.wallet_logo_url = wallet_info.wallet_logo_url;
        self.wallets.insert(&record.wallet_name, &record);
    }

    pub fn get_wallet(&self, wallet_name: String) -> HumanReadableWalletInfo {
        let account = self.wallets.get(&wallet_name).unwrap_or_default();
        HumanReadableWalletInfo {
            wallet_name,
            wallet_url: account.wallet_url,
            wallet_logo_url: account.wallet_logo_url,
        }
    }

    /// Returns the list of accounts
    pub fn get_wallets(&self, from_index: u64, limit: u64) -> Vec<HumanReadableWalletInfo> {
        let keys = self.wallets.keys_as_vector();
        (from_index..std::cmp::min(from_index + limit, keys.len()))
            .map(|index| self.get_wallet(keys.get(index).unwrap()))
            .collect()
    }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 *
 * To run from contract directory:
 * cargo test -- --nocapture
 *
 * From project root, to run in combination with frontend tests:
 * yarn test
 *
 */
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    // mock the context for testing, notice "signer_account_id" that was accessed above from env::
    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice_near".to_string(),
            signer_account_id: "bob_near".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "carol_near".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    #[test]
    fn set_then_get_greeting() {
        let context = get_context(vec![], false);
        testing_env!(context);
        let mut contract = Welcome::default();
        // contract.set_greeting("howdy".to_string());
    }

    #[test]
    fn get_default_greeting() {
        let context = get_context(vec![], true);
        testing_env!(context);
        let contract = Welcome::default();
        // this test did not call set_greeting so should return the default "Hello" greeting
    }
}
