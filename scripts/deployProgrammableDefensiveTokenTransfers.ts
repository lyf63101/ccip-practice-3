import { ethers, network, run } from "hardhat";

// deploy on ethereum sepolia
async function main() {
  const ccipRouterAddressEthereumSepolia = `0x0bf3de8c5d3e8a2b34d2beeb17abfcebaf363a59`;
  const linkTokenAddressEthereumSepolia = `0x779877A7B0D9E8603169DdbD7836e478b4624789`;
  // const chainSelectorAvalancheFuji = `14767482510784806043`;

  const contract = await ethers.deployContract("ProgrammableDefensiveTokenTransfers", [
    ccipRouterAddressEthereumSepolia,
    linkTokenAddressEthereumSepolia
  ]);

  await contract.waitForDeployment();

  console.log(`ProgrammableDefensiveTokenTransfers deployed on ${network.name} with address ${contract.target}`);

  const tx = contract.deploymentTransaction();
  if (!tx) return;
  console.log("Wait for 5 blocks");
  await tx.wait(5);

  const contractAddress = await contract.getAddress();
  // const contractAddress = '0xb1f65bbe991eb7274f63e2fe4eb171be583cebc1';
  console.log(`ProgrammableDefensiveTokenTransfers contract deployed at: ${contractAddress}`);

  console.log(`Verify ProgrammableDefensiveTokenTransfers contract on ${network.name}...`);
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [
        ccipRouterAddressEthereumSepolia,
        linkTokenAddressEthereumSepolia
      ]
    });
    console.log(`ProgrammableDefensiveTokenTransfers contract verified on ${network.name}!`);
  } catch (err) {
    console.error("Error verify ProgrammableDefensiveTokenTransfers contract:", err);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
