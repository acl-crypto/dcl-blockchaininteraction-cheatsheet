// importing all the ETH-stuff

import * as EthereumController from "@decentraland/EthereumController";
export let eth = EthereumController;
import * as EthConnect from '../node_modules/eth-connect/esm';
import { manaabi } from '../contracts/mana';
import { getProvider } from '@decentraland/web3-provider';
import * as gamets from '../src/game';
export let UserAccountGlobal = 'loading ....'; export let UserBalanceGlobal = 0; export let BlockNumberGlobal = 'loading ....'; export let nonceGlobal = 'loading ....'; export let TokenNameRopstenGlobal = 'loading ....'; export let TokendecimalsRopstenGlobal = 0; export let TokentotalSupplyRopstenGlobal = 'loading ....';

// Singing a message via Decentraland EthereumController

let signMessage01 = "(Text 01)";
let signMessage02 = "(Text 02)"
export const messageToSign = `# DCL Signed message
Product: `+ signMessage01 + `
Price: ` + signMessage02 + ` ETH
Are you sure ? : (sign/cancel)`

export function signMessage(msg: string) {
  executeTask(async () => {
    try { // checking Metamask-connection
      const UserAccount = await eth.getUserAccount();
      gamets.metamasktrue(); // Metamask connected => loading correct-scene
      log("wallet: " + UserAccount);
      UserAccountGlobal = JSON.stringify(UserAccount)
      log("wallet-stringlify " + UserAccountGlobal)
      const convertedMessage = await eth.convertMessageToObject(msg)
      const { message } = await eth.signMessage(convertedMessage)
      const originalMessageHex = await EthConnect.toHex(msg)
      const sentMessageHex = await EthConnect.toHex(message)
      const isEqual = sentMessageHex === originalMessageHex
      log("Is the message correct?", isEqual)
    } catch {
      gamets.metamaskfalse(); // Metamask not-connected => loading error-scene
    }
  })
}

signMessage(messageToSign)

// Payment via Decentraland EthereumController (use latest Metamask-version !)

export const myWallet = '0x6a8920D18B477c3e7446cf7f82dC0A9E38BF5FcF'; // insert your wallet address
export const ProductPrice = 0.005;

export function payment() {
  executeTask(async () => {
    try {
      await eth.requirePayment(myWallet, ProductPrice, 'ETH');
      log("Metamask pop-up!");
    } catch {
      log("payment process failed")
    }
  })
}

// Using eth-connect
executeTask(async () => {
  // create an instance of the web3 provider to interface with Metamask
  const provider = await getProvider();
  // get UserAccount
  const UserAccount = await eth.getUserAccount();
  // Create the object that will handle the sending and receiving of RPC messages
  const requestManager = new EthConnect.RequestManager(provider)
  // Blockchain - getting the latest block-number
  const actualBlocknumber = await requestManager.eth_blockNumber();
  BlockNumberGlobal = JSON.stringify(actualBlocknumber);
  log("Actual block-number: " + actualBlocknumber);
  // Blockchain - getting the latest balance
  const myBalance = await requestManager.eth_getBalance(UserAccount, actualBlocknumber);
  let UserBalanceGlobalFull = (myBalance.toNumber() / 1000000000000000000).toFixed(5);
  UserBalanceGlobal = JSON.parse(UserBalanceGlobalFull)
  log("My wallet-address: " + UserAccount + ", My balance: " + myBalance + " at block-number: " + actualBlocknumber);
  // Blockchain - getting my nonce
  const getTransactionCount = await requestManager.eth_getTransactionCount(UserAccount, actualBlocknumber);
  nonceGlobal = JSON.stringify(getTransactionCount);
  log("My nonce: " + getTransactionCount);

  // The following only works on Ropsten network!

  // Use the factory object to instance a `contract` object, referencing a specific contract
  const factory = new EthConnect.ContractFactory(requestManager, manaabi);
  const manaaddressropsten = '0x2a8fd99c19271f4f04b1b7b9c4f7cf264b626edb'; // Ropsten MANA-address

  const contract = (await factory.at(manaaddressropsten)) as any;

  const TokenNameRopsten = await contract.name();
  TokenNameRopstenGlobal = JSON.stringify(TokenNameRopsten);
  log("Token Name: " + TokenNameRopsten);

  const TokendecimalsRopsten = await contract.decimals();
  TokendecimalsRopstenGlobal = JSON.parse(TokendecimalsRopsten);
  log("Token Decimals: " + TokendecimalsRopsten);

  const TokentotalSupplyRopsten = await contract.totalSupply();
  TokentotalSupplyRopstenGlobal = JSON.stringify(TokentotalSupplyRopsten);
  log("Token Total Supply: " + TokentotalSupplyRopsten);

})

