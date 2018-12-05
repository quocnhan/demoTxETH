const Web3 = require('web3')
const Tx = require('ethereumjs-tx')
const config = require('./config.js')
const request = require('request');
const txDecoder = require('ethereum-tx-decoder');
// connect to Infura node
const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'))

// the address that will send the test transaction
const addressFrom = '0xA75B2d7b277919c224B198743C88EfE608BA8c1e'
// the destination address
const addressTo = '0xd3DA58a12ec671e5e48D76A13B64be08377DdAc8'

let myData;
function sendSigned(txData) {
    const privateKey = new Buffer(config.privkey1, 'hex')
    const transaction = new Tx(txData)
    transaction.sign(privateKey)
    const serializedTx = transaction.serialize().toString('hex')
    return new Promise((resolve,reject)=>{
        web3.eth.sendSignedTransaction('0x' + serializedTx, (err,data)=>{
            if(err) resolve(err);
            resolve(data);
        });
    })
}

const getNonce = (_addressFrom) => {
    return new Promise((resolve, reject) => {
        resolve(web3.eth.getTransactionCount(_addressFrom));
    })
}

// construct the transaction data
async function getData(_gasLimmit, _gasPrice, _to, _from, _value, _data, _nonce) {
    return {
        nonce: web3.utils.toHex(_nonce),
        gasLimit: web3.utils.toHex(_gasLimmit),
        gasPrice: web3.utils.toHex(_gasPrice), // 10 Gwei
        to: _to,
        from: _from,
        value: web3.utils.toHex(web3.utils.toWei(_value, 'ether')),
        data: web3.utils.toHex(_data)
    }
}

async function sendMultiTxs() {
    try {getNum
        let nonce = await getNonce(addressFrom);
        let tx1 = await getData(48000, 20e9, addressTo, addressFrom, '1', 'Hello Zohar !',nonce);
        let hash1 = await sendSigned(tx1);
        let tx2 = await getData(48000, 20e9, addressTo, addressFrom, '1', 'Hello Pika !',nonce+1);
        let hash2 = await sendSigned(tx2);
        mydata={Hash1:hash1,Hash2:hash2};
        
    }
    catch (e) {
        console.log(e);
    }
}

// sendMultiTxs();

var options = {
    url: `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${addressFrom}`,
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        let arrResult= info.result;
        // console.log(res);
        arrResult.forEach(element => {
            // console.log(web3.utils.toAscii(element.input) );
            console.log(element);
            
        });
    }
}
// request(options, callback);
async function getDetails(tx){
    let txDetails = await web3.eth.getTransaction(tx);
    console.log(txDetails);
    
}
getDetails('0x58b9d4d7cc1743834adfe44ded9d4d9a91dcdb002e099d067b6f45eb443959ea');
