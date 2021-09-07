import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"

import { mintOneToken } from "../lib/mint-one-token"

const useMinter = () => {
  const wallet = useWallet()
  const { connection } = useConnection()

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

    try {
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
