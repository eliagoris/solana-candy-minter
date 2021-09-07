import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect, useState } from "react"

import { mintOneToken } from "../lib/mint-one-token"
import useCandyMachine from "./useCandyMachine"

const useMinter = () => {
  const wallet = useWallet()
  const { connection } = useConnection()
  const { candyMachine } = useCandyMachine()

  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [logs, setLogs] = useState([])

  useEffect(() => {
    if (status) {
      setLogs((previous) => previous.concat(status))
    }
  }, [status, setLogs])

  const mint = async () => {
    setIsLoading(true)
    setLogs([])

    try {
      setStatus("Checking wallet balance...")
      const mintPrice = candyMachine?.data?.price?.toNumber() / LAMPORTS_PER_SOL
      const walletBalance =
        (await connection.getBalance(wallet.publicKey)) / LAMPORTS_PER_SOL

      if (walletBalance < mintPrice)
        throw new Error("Insufficient balance on wallet " + wallet.publicKey)

      setStatus("Minting one token...")
      const result = await mintOneToken(wallet)
      setStatus("Waiting for transaction to be confirmed...")

      await connection.confirmTransaction(result)

      setStatus("Tansaction confirmed!")

      setStatus(
        "Success! Your NFT has been minted! Check your wallet collectibles."
      )
      setIsLoading(false)

      return true
    } catch (error) {
      setStatus(error + "")
      console.log(error)
    }

    setStatus("")
    setIsLoading(false)
  }

  return {
    isLoading,
    status,
    logs,
    mint,
  }
}

export default useMinter
