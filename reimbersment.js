
async function main() {
    require('dotenv').config();
    const {createAlchemyWeb3} = require("@alch/alchemy-web3");
    try {
        const web3 = createAlchemyWeb3(process.env.ROPSTEN_URL);
        const myAddress = '0x0F06707E5E4f7329d2497121d536479c3c4F1129' //TODO: replace this address with your own public address

        const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

        const transaction = {
            'to': '0xCEDC601D1E9696DD34C0F132812198E250109183', // faucet address to return eth
            'value': 200000000000000000,
            'gas': 30000,
            'maxFeePerGas': 3000000000,
            'nonce': nonce,
            // optional data field to send message or execute smart contract
        };

        const signedTx = await web3.eth.accounts.signTransaction(transaction, process.env.PRIVATE_KEY);

        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
            if (!error) {
                console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
            } else {
                console.log("❗Something went wrong while submitting your transaction:", error)
            }
        });
    } catch (e) {
        console.log(e)
    }
    ;
}

main();