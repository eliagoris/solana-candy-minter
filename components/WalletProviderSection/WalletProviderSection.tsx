/** @jsxImportSource theme-ui */
import React, { FC, useMemo } from "react"

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import {
  getLedgerWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"

import Minter from "./Minter"

/**
 * Component that contains the whole minting process
 * It is necessary to be separate, since it depends on the global window variable
 * Then the rest of the page can be rendered on server
 */
const WalletProviderSection: FC = () => {
  
  const network = process.env
    .NEXT_PUBLIC_CONNECTION_NETWORK as WalletAdapterNetwork

    const endpoint = process.env.NEXT_PUBLIC_CONNECTION_NETWORK == 'devnet' ? 
                     process.env.NEXT_PUBLIC_SOLANA_RPC_HOST_DEVNET : 
                     process.env.NEXT_PUBLIC_SOLANA_RPC_HOST_MAINNET_BETA

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getTorusWallet({
        options: { clientId: "Get a client ID @ https://developer.tor.us" },
      }),
      getLedgerWallet(),
      getSolletWallet({ network }),
    ],
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider logo="/images/logo.png">
          <Minter />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletProviderSection
