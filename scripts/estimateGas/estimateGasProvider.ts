// Load and configure environment variables from a .env file.
require("@chainlink/env-enc").config();

// Import the ethers library for interacting with the Ethereum blockchain.
import { ethers } from "ethers";
// Import a function to get configuration details for CCIP (Cross-Chain Interoperability Protocol).
import { getCCIPConfig } from "../ccip.config";
// Import helper functions for building transaction data and estimating intrinsic gas.
import { estimateIntrinsicGas, buildTransactionData, getReceiverInterface } from "./helper";
// Import script input config.
import config from "./config";

/**
 * Estimates gas usage for sending transactions from [from] to [to].
 */
async function estimateGas() {
  console.log(`Estimating gas usage for transfer usdc from ${config.from} to ${config.to}.`);
  // Retrieve router address and chain selector from the configuration for sender and receiver.
  const receiverRouterAddress = getCCIPConfig(config.to).router;
  const senderChainSelector = getCCIPConfig(config.from).chainSelector;

  // Retrieve sender and receiver addresses from config data.
  const sender = config[config.from].sender;
  const receiver = config[config.to].receiver;

  console.log(`Sender address: ${sender}  Receiver address ${receiver}.`);

  const usdcAddress = getCCIPConfig(config.to).usdcToken;

  // Initialize a provider for interacting with the to blockchain using the RPC URL.
  const provider = new ethers.JsonRpcProvider(config[config.to].rpcUrl);

  const receiverInterface = await getReceiverInterface();
  const data = buildTransactionData(
    receiverInterface,
    usdcAddress,
    config.tokenAmount,
    senderChainSelector,
    sender
  );
  const estimatedGas = await provider.estimateGas({
    to: receiver,
    from: receiverRouterAddress,
    data,
  });

  const intrinsicGas = estimateIntrinsicGas(data);

  const ccipReceiveGas = estimatedGas - intrinsicGas;

  console.log(
    "Final Gas Usage Report:\n",
    ` ccipReceiveGas: ${ccipReceiveGas} recommandGasLimit: ${ccipReceiveGas + BigInt(Math.ceil(Number(ccipReceiveGas) / 10))}`,
    `\nDetail:\n estimatedGas: ${estimatedGas} intrinsicGas: ${intrinsicGas}`,
  );
}

// Execute the `estimateGas` function and catch any errors.
estimateGas().catch(console.error);
