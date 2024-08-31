## guidance

1. deploy contract TransferUSDC as a sender contract
2. deploy Receiver or ProgrammableTokenTransfers as a receiver contract
3. call allowlistDestinationChain method in TransferUSDC to add allowed destination chain where receiver deployed
4. call allowlistSourceChain and allowlistSender method in receiver contract to add allowed source chain where sender deployed and allowed sender
5. get receiver contract abi json file and replace `abi/receiver.json` file content
6. input in contract address(sender and receiver), from(sender deploy chain name), to(receiver deploy chain name), tokenAmount `scripts/estimateGas/config.ts`
7. run `ts-node scripts/estimateGas/estimateGasProvider.ts`

> notification
> 1. config files `hardhat.config.ts` `.env` `scripts/ccip.config.ts` `scripts/estimateGas/config.ts`
> 2. abi file: `abi/receiver.json`
> 3. assume you have set PRIVATE_KEY, ARBITRUM_SEPOLIA_RPC_URL, ETHEREUM_SEPOLIA_RPC_URL, AVALANCHE_FUJI_RPC_URL, ETHERSCAN_API_KEY
