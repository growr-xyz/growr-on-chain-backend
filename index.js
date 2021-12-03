// const Tropykus = require('@tropykus/tropykus');

// const tropykus = new Tropykus('https://public-node.testnet.rsk.co', 400000);

// tropykus.setComptroller('0xd8f5366b7bbe1275336fc3b929646104379e1d7d');


// const mnemonic = "clip close motion iron catalog junk quick duck earn reveal cool put";
// const derivationPath = `m/44'/60'/0'/0/0`;



// const main = async () => {
//   try {
//     const crbtc = await tropykus.addMarket('TRBTC', true, "0x05c982D1cD43D37CfEd2E3c2a5512B99C13E9e16");
//     let r = await tropykus.comptroller.allMarkets()
//     console.log('result ', r)
//     tropykus.setAccount(mnemonic, derivationPath);
//     console.log('account: ', tropykus.account.address);
//     const balance = await crbtc.balanceOfUnderlying(tropykus.account);
//     console.log({ balance })
//   } catch (e) {
//     console.error('ERRR ', e)
//   }
// }

// main()

/*
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider('https://public-node.testnet.rsk.co', { name: 'rsk-testnet', chainId: 31 });

const walletAddress = '0xaD334dFA23A2b06d31d53092b9E429BB2EeE99A6'

const main = async () => {
  const signer = await provider.getSigner(walletAddress)
  signer.getBalance()
  const balance = await signer.getBalance()
  console.log(ethers.utils.formatEther(balance))
}

main()
*/
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/schema/index');
const resolvers = require('./graphql/resolver/index');
const { GraphQLServer } = require('graphql-yoga');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var database = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/peseta`
mongoose.connect(database)
  .then(() => {
    console.log('Connection to DB successful');
  })
  .catch(err => {
    console.log('Db connection error====', err);
  });
//handling of graphQL schema and resolvers
const server = new GraphQLServer({
  typeDefs,  //importing and defining graphql schema
  resolvers  //importing all resolvers
});
server.start(() => {
  console.log('GraphQL Listening on port 4000');
});