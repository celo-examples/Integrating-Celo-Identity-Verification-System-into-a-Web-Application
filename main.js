const Web3 = require('web3');
const ContractKit = require('@celo/contractkit');
const web3 = new Web3('https://celo-alfajores--rpc.datahub.figment.io/apikey/YOUR_API_KEY/');
const kit = ContractKit.newKitFromWeb3(web3);

async function deployContract() {
    const accounts = await kit.web3.eth.getAccounts();
    const IdentityVerifier = new kit.web3.eth.Contract(
      IdentityVerifierABI,
      null,
      { data: IdentityVerifierBytecode }
    );
    const tx = IdentityVerifier.deploy();
    const createTransaction = await kit.sendTransactionObject(
      tx,
      { from: accounts[0] }
    );
    const createReceipt = await createTransaction.sendAndWaitForReceipt();
    const IdentityVerifierAddress = createReceipt.contractAddress;
    return IdentityVerifierAddress;
}

const form = document.getElementById('identity-verification-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const phoneNumber = document.getElementById('phone-number').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const identityVerifier = new kit.web3.eth.Contract(
        IdentityVerifierABI,
        IdentityVerifierAddress
    );
    const accounts = await kit.web3.eth.getAccounts();
    const tx = identityVerifier.methods.verify(accounts[0]);
    const sendTransaction = await kit.sendTransactionObject(
        tx,
        { from: accounts[0], value: kit.web3.utils.toWei('1', 'ether') }
    );
    const sendReceipt = await sendTransaction.sendAndWaitForReceipt();
    const isVerified = await identityVerifier.methods.isVerified(accounts[0]).call();
    if (isVerified) {
        alert('Your identity has been verified!');
    } else {
        alert('Your identity could not be verified.');
    }
});