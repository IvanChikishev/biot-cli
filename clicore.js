#!/usr/bin/env node

const biot = require('biot-core');
const program = require('commander');

const stateSequence = [
    biot.getWallets,
    biot.getMyDeviceWallets,
    biot.getAddressesInWallet,
    biot.createNewWallet,
    biot.createNewAddress,
    biot.getWalletBalance,
    biot.getAddressBalance,
    biot.sendPaymentFromWallet,
    biot.sendPaymentFromWalletUseUnstableUnits,
    biot.getListTransactionsForAddress,
    biot.getListTransactionsForWallet,
    biot.myAddressInfo,
    biot.signDevicePrivateKey,
    biot.signWithAddress,
    biot.verifySign,
    biot.addCorrespondent,
    biot.removeCorrespondent,
    biot.listCorrespondents
];


program.command('getWallets')
    .description('Getting list of wallets')
    .action(async () => console.log(await biot.getWallets()));

program.command('getMyDeviceWallets')
    .description('Getting list of wallets')
    .action(async () => console.log(await biot.getMyDeviceWallets()));

program.command('getAddressesInWallet <walledId>')
    .description('Getting list of addresses')
    .action(async (walletId) => console.log(await biot.getAddressesInWallet(walletId)));

program.command('createNewWallet')
    .description('Creating new wallet')
    .action(async () => console.log(await biot.createNewWallet()));

program.command('createNewAddress <walletId>')
    .description('Creating new address')
    .action(async (walletId) => console.log(await biot.createNewAddress(walletId)));

program.command('getWalletBalance <walletId>')
    .description('Getting balance of wallet')
    .action(async (walledId) => console.log(await biot.getWalletBalance(walletId)));

program.command('getAddressBalance <address>')
    .description('Getting list of wallets')
    .action(async (address) => console.log(await biot.getAddressBalance(address)));

program.command('sendPaymentFromWallet <options>')
    .description('Sending payment from wallet')
    .action(async (params) => console.log(await biot.sendPaymentFromWallet(params)));

program.command('sendPaymentFromWalletUseUnstableUnits <options>')
    .description('Sending payment from wallet use unstable units')
    .action(async (options) => console.log(await biot.sendPaymentFromWalletUseUnstableUnits(options)));

program.command('getListTransactionsForWallet <walletId>')
    .description('Getting list of transactions by wallet.')
    .action(async (walletId) => console.log(await biot.getListTransactionsForWallet(walletId)));

program.command('getListTransactionsForAddress <walletId>')
    .description('Getting list of transactions by address')
    .action(async (walletId) => console.log(await biot.getListTransactionsForAddress(walletId)));

program.command('myAddressInfo <address>')
    .description('Getting address info')
    .action(async (address) => console.log(await biot.myAddressInfo(address)));

program.command('signDevicePrivateKey <hash>')
    .description('Signing device private key')
    .action(async (hash) => console.log(await biot.myAddressInfo(hash)));

program.command('signWithAddress <account> <isChange> <addrressIndex> <hash>')
    .description('Signing with address')
    .action(async (account, is_change, address_index, hash) => console.log(await biot.signWithAddress(account, is_change, address_index, hash)));

program.command('verifySign <hash> <b64Sig> <b64PubKey>')
    .description('Sign verification')
    .action(async (hash, b64_sig, b64_pub_key) => console.log(await biot.verifySign(hash, b64_sig, b64_pub_key)));

program.command('addCorrespondent <code>')
    .description('Add a correspondent')
    .action(async (code) => console.log(await biot.addCorrespondent(code)));

program.command('removeCorrespondent <deviceAddress>')
    .description('Remove a correspondent')
    .action(async (address) => console.log(await biot.removeCorrespondent(address)));

program.command('listCorrespondents')
    .description('List of correspondents')
    .action(async () => console.log(await biot.removeCorrespondent()));

program.command('initSocketRpc <host> <port>')
    .description('initializes the rpc socket')
    .action((host, port) => {
        const socket = require('biot-rpc');
        let service = socket.createServer(stateSequence);
        service.http().listen(port, host);

        console.log("Server is running");
    });

program.command('initSocketWs <host> <port>')
    .description('initializes the websocket')
    .action((host, port) => {
        const net = require('biot-networking');
        let service = net.init(net.bind(stateSequence),
            { host: host, port: port });

        console.log("Server is running");
    });


async function Start() {
    await biot.init('test');
    program.parse(process.argv);
    return 'Ok';
}

Start().then(console.log).catch(console.error);