export const networks = [
    {
        chainId: `0x${Number(1).toString(16)}`,
        chainName: "Ethereum Mainnet",
        nativeCurrency: {
          name: "Ethereum",
          symbol: "ETH",
          decimals: 18
        }
    },
    {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "Polygon",
        symbol: "MATIC",
        decimals: 18
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"]
    },
    {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance",
        symbol: "BNB",
        decimals: 18
      },
      rpcUrls: [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed4.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed2.defibit.io",
        "https://bsc-dataseed3.defibit.io",
        "https://bsc-dataseed4.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed2.ninicoin.io",
        "https://bsc-dataseed3.ninicoin.io",
        "https://bsc-dataseed4.ninicoin.io",
        "wss://bsc-ws-node.nariox.org"
      ],
      blockExplorerUrls: ["https://bscscan.com"]
    },
    {
        chainId: `0x${Number(1666600000).toString(16)}`,
        chainName: "Harmony Mainnet Shard 0",
        nativeCurrency: {
          name: "Harmony",
          symbol: "ONE",
          decimals: 18
        },
        rpcUrls: ["https://api.harmony.one"],
        blockExplorerUrls: ["https://explorer.harmony.one"]
    },
    {
        chainId: `0x${Number(43114).toString(16)}`,
        chainName: "Avalanche Mainnet",
        nativeCurrency: {
          name: "Avalanche",
          symbol: "AVAX",
          decimals: 18
        },
        rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://snowtrace.io/"]
    },
    {
        chainId: `0x${Number(250).toString(16)}`,
        chainName: "Fantom Opera",
        nativeCurrency: {
          name: "Fantom",
          symbol: "FTM",
          decimals: 18
        },
        rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://ftmscan.com"]
    },
    
];