import { ethers, network, run } from "hardhat";
import { Wallet } from "ethers";
import { Receiver, Receiver__factory } from "../typechain-types";

const chainSelectorAvalancheFuji = `14767482510784806043`;
const linkTokenAddressEthereumSepolia = `0x779877A7B0D9E8603169DdbD7836e478b4624789`;

// deploy Receiver on ethereum sepolia
async function main() {
  console.log("deploy Receiver on ethereum sepolia");
  const ccipRouterAddressEthereumSepolia = `0x0bf3de8c5d3e8a2b34d2beeb17abfcebaf363a59`;
  const contract = await ethers.deployContract("Receiver", [
    ccipRouterAddressEthereumSepolia,
    // linkTokenAddressEthereumSepolia
  ]);

  await contract.waitForDeployment();

  console.log(`Receiver deployed on ${network.name} with address ${contract.target}`);

  const tx = contract.deploymentTransaction();
  if (!tx) return;
  console.log("Wait for 5 blocks");
  await tx.wait(5);

  const contractAddress = await contract.getAddress();

  // const contractAddress = '0x4bfD573E79b6674bba2959cb951Ac586989577c3';
  console.log(`Receiver contract deployed at: ${contractAddress}`);

  console.log(`Verify Receiver contract on ${network.name}...`);
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [
        ccipRouterAddressEthereumSepolia,
      ]
    });
    console.log(`Receiver contract verified on ${network.name}!`);
  } catch (err) {
    console.error("Error verify Receiver contract:", err);
  }

  // const receiverAddress = '0xd482a9e9Ad9Bfc39a53C53399d75c93204E83685';
  // const senderAddress = '0xd3EdA85cbBDbb1c7f3e3B675eC9A1DDA133A0BB8';

  // const privateKey = process.env.PRIVATE_KEY!;
  // const rpcProviderUrl = process.env.ETHEREUM_SEPOLIA_RPC_URL;

  // const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  // const wallet = new Wallet(privateKey);
  // const signer = wallet.connect(provider);

  // const receiver: Receiver = Receiver__factory.connect(receiverAddress, signer);

  // const allowSenderTx = await receiver.allowlistSender(senderAddress, true);
  // console.log(`Allowlist add sender success: ${senderAddress}, transaction hash: ${allowSenderTx.hash}`);

  // const allowSourceChainTx = await receiver.allowlistSourceChain(chainSelectorAvalancheFuji, true);
  // console.log(`Allowlist add source chain success: ${chainSelectorAvalancheFuji}, transaction hash: ${allowSourceChainTx.hash}`);

  // const isAllowSender = await receiver.allowlistedSenders(senderAddress);
  // console.log(`isAllowSender:`, isAllowSender, JSON.stringify(isAllowSender));

  // const isAllowSourceChain = await receiver.allowlistedSourceChains(chainSelectorAvalancheFuji);
  // console.log(`isAllowSourceChain:`, isAllowSourceChain, JSON.stringify(isAllowSourceChain));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
