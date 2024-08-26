// deployXNFT.ts

import { ethers, network } from "hardhat";

async function main() {
  // const ccipRouterAddressEthereumSepolia = `0x0bf3de8c5d3e8a2b34d2beeb17abfcebaf363a59`;
  // const linkTokenAddressEthereumSepolia = `0x779877A7B0D9E8603169DdbD7836e478b4624789`;
  // const chainSelectorEthereumSepolia = `16015286601757825753`;

  const ccipRouterAddressAvalancheFuji = `0x0bf3de8c5d3e8a2b34d2beeb17abfcebaf363a59`;
  const linkTokenAddressAvalancheFuji = `0x779877A7B0D9E8603169DdbD7836e478b4624789`;
  const usdcTokenAddressAvalancheFuji = `0x5425890298aed601595a70AB815c96711a31Bc65`;
  const chainSelectorAvalancheFuji = `14767482510784806043`;

  const transferUSDC = await ethers.deployContract("TransferUSDC", [
    ccipRouterAddressAvalancheFuji,
    linkTokenAddressAvalancheFuji,
    usdcTokenAddressAvalancheFuji
  ]);

  await transferUSDC.waitForDeployment();

  console.log(`TransferUSDC deployed on ${network.name} with address ${transferUSDC.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});