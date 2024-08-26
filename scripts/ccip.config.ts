const networks = {
  ethereumSepolia: {
    router: "0x0bf3de8c5d3e8a2b34d2beeb17abfcebaf363a59",
    chainSelector: "16015286601757825753",
    linkToken: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    usdcToken: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  },
  avalancheFuji: {
    router: "0xf694e193200268f9a4868e4aa017a0118c9a8177",
    chainSelector: "14767482510784806043",
    linkToken: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    usdcToken: "0x5425890298aed601595a70AB815c96711a31Bc65",
  },
  arbitrumSepolia: {
    router: "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165",
    chainSelector: "3478487238524512106",
    linkToken: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
    usdcToken: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
  }
};

type SupportedNetworks = keyof typeof networks;

const getCCIPConfig = (network: SupportedNetworks) => {
  if (networks[network]) {
    return networks[network];
  }
  throw new Error("Unknown network: " + network);
};

export { getCCIPConfig, SupportedNetworks };
