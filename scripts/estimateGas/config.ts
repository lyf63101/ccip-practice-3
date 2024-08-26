enum EChainName {
  ethereumSepolia = 'ethereumSepolia',
  avalancheFuji = 'avalancheFuji'
};

const ETHEREUM_SEPOLIA_RPC_URL = process.env.ETHEREUM_SEPOLIA_RPC_URL;
const OPTIMISM_SEPOLIA_RPC_URL = process.env.OPTIMISM_SEPOLIA_RPC_URL;
const ARBITRUM_SEPOLIA_RPC_URL = process.env.ARBITRUM_SEPOLIA_RPC_URL;
const AVALANCHE_FUJI_RPC_URL = process.env.AVALANCHE_FUJI_RPC_URL;
const POLYGON_AMOY_RPC_URL = process.env.POLYGON_AMOY_RPC_URL;
const BNB_CHAIN_TESTNET_RPC_URL = process.env.BNB_CHAIN_TESTNET_RPC_URL;
const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL;
const KROMA_SEPOLIA_RPC_URL = process.env.KROMA_SEPOLIA_RPC_URL;
const WEMIX_TESTNET_RPC_URL = process.env.WEMIX_TESTNET_RPC_URL;
const GNOSIS_CHIADO_RPC_URL = process.env.GNOSIS_CHIADO_RPC_URL;
const CELO_ALFAJORES_RPC_URL = process.env.CELO_ALFAJORES_RPC_URL;
const METIS_SEPOLIA_RPC_URL = process.env.METIS_SEPOLIA_RPC_URL;
const ZKSYNC_SEPOLIA_RPC_URL = process.env.ZKSYNC_SEPOLIA_RPC_URL;

const config = {
  [EChainName.ethereumSepolia]: {
    rpcUrl: ETHEREUM_SEPOLIA_RPC_URL,
    sender: "",
    // receiver: "0xd482a9e9Ad9Bfc39a53C53399d75c93204E83685"
    receiver: "0x80BC4B3D88437004Eee06aC27A158113E8802DE3"
  },
  [EChainName.avalancheFuji]: {
    rpcUrl: AVALANCHE_FUJI_RPC_URL,
    sender: "0xd3EdA85cbBDbb1c7f3e3B675eC9A1DDA133A0BB8",
    receiver: ""
  },
  tokenAmount: 1000000,
  from: EChainName.avalancheFuji,
  to: EChainName.ethereumSepolia
};

export default config;
