import { Program, Provider, web3 } from "@project-serum/anchor"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"

import {
  getCandyMachine,
  CANDY_MACHINE_PROGRAM_ID,
} from "../lib/mint-one-token"

/**
 * Fetches and returns the candy machine to be able to read its data
 */
const useCandyMachine = () => {
  const [candyMachine, setCandyMachine] = useState(null)
  const { connection } = useConnection()

  const wallet = useWallet()

  useEffect(() => {
    const fetchCandyMachine = async () => {
      const config = new web3.PublicKey(
        process.env.NEXT_PUBLIC_CANDY_MACHINE_CACHE_PROGRAM_CONFIG
      )
      const [candyMachine] = await getCandyMachine(
        config,
        process.env.NEXT_PUBLIC_CANDY_MACHINE_CACHE_PROGRAM_UUID
      )

      const anchorWallet = {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      }

      const provider = new Provider(connection, anchorWallet, {
        preflightCommitment: "recent",
      })

      const idl = await Program.fetchIdl(CANDY_MACHINE_PROGRAM_ID, provider)
      const anchorProgram = new Program(idl, CANDY_MACHINE_PROGRAM_ID, provider)

      const candy = await anchorProgram.account.candyMachine.fetch(candyMachine)

      setCandyMachine(candy)
    }

    fetchCandyMachine()
  }, [])

  return {
    candyMachine,
  }
}

export default useCandyMachine
