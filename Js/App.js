document.addEventListener('DOMContentLoaded', async () => {
  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const abi = [/* Your Contract ABI Here */];
    const contract = new web3.eth.Contract(abi, contractAddress);

    document.getElementById('stakeButton').addEventListener('click', async () => {
      const amount = document.getElementById('stakeAmount').value;
      const accounts = await web3.eth.getAccounts();
      await contract.methods.stake(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
    });

    document.getElementById('withdrawButton').addEventListener('click', async () => {
      const amount = document.getElementById('withdrawAmount').value;
      const accounts = await web3.eth.getAccounts();
      await contract.methods.withdraw(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
    });

    document.getElementById('claimRewardsButton').addEventListener('click', async () => {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.claimRewards().send({ from: accounts[0] });
    });

    async function updateStakedValue() {
      const valueInUSD = await contract.methods.getStakedValueInUSD().call();
      document.getElementById('stakedValue').innerText = web3.utils.fromWei(valueInUSD, 'ether') + ' USD';
    }

    setInterval(updateStakedValue, 10000); // Update every 10 seconds
  } else {
    alert('Please install MetaMask!');
  }
});
