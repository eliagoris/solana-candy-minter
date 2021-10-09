import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect, useState } from "react"

import { mintOneToken } from "../lib/mint-one-token"
import useCandyMachine from "./useCandyMachine"
import useMetadataAccounts from "./useMetadataAccounts"
import presaleWallets from "../lib/presaleWallets.json"

const useMinter = () => {
  const wallet = useWallet()
  const { connection } = useConnection()
  const { candyMachine } = useCandyMachine()
  const { metadataAccounts, fetchMetadataAccounts } = useMetadataAccounts()

  const [isLoading, setIsLoading] = useState(false)
  const [isMintLoading, setIsMintLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [logs, setLogs] = useState([])

  useEffect(() => {
    if (status) {
      setLogs((previous) => previous.concat(status))
    }
  }, [status, setLogs])

  useEffect(() => {
    if (!metadataAccounts) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [metadataAccounts])

  const mint = async (quantity = 1) => {
    /** Do nothing if minting is loading */
    if (isMintLoading) return true

    setIsMintLoading(true)
    setLogs([])
    setStatus("")

    try {
      /** Fetch new metadata every time the user triggers the mint function */
      await fetchMetadataAccounts()

      const isWalletWhitelisted = presaleWallets?.find(
        (key) => key === wallet.publicKey.toString()
      )

      if (!isWalletWhitelisted)
        throw new Error(
          "Wallet " +
            wallet.publicKey.toString() +
            " is not on the presale whitelist."
        )

      const alreadyHasOne = metadataAccounts?.find((metadata) => {
        return metadata.data.indexOf("NFT_NAME") !== -1
      })

      if (alreadyHasOne)
        throw new Error(
          "Wallet " + wallet.publicKey.toString() + " already owns a NFT_NAME"
        )

      setStatus("Checking wallet balance...")
      const mintPrice = candyMachine?.data?.price?.toNumber() / LAMPORTS_PER_SOL
      const walletBalance =
        (await connection.getBalance(wallet.publicKey)) / LAMPORTS_PER_SOL

      if (walletBalance < mintPrice)
        throw new Error("Insufficient balance on wallet " + wallet.publicKey)

      for (let i = 0; i < quantity; i++) {
        setStatus("Minting...")
        const result = await mintOneToken(wallet)

        setStatus("Waiting for transaction to be confirmed...")
        await connection.confirmTransaction(result)
        setStatus("Tansaction confirmed!")
      }

      setStatus(
        "Success! Your NFT has been minted! Check your wallet collectibles."
      )

      /** Fetch new metadatas */
      setIsLoading(true)
      await fetchMetadataAccounts()
      setIsLoading(false)
      setIsMintLoading(false)

      return true
    } catch (error) {
      setStatus(error + "")
      console.log(error)
    }
  }

  return {
    isLoading,
    isMintLoading,
    status,
    logs,
    mint,
  }
}

export default useMinter
