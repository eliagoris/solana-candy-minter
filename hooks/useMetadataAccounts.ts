import { useEffect, useState } from "react"
import { AccountLayout, TOKEN_PROGRAM_ID, u64 } from "@solana/spl-token"
import { PublicKey } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"

const deserializeAccount = (data: Buffer) => {
  const accountInfo = AccountLayout.decode(data)
  accountInfo.mint = new PublicKey(accountInfo.mint)
  accountInfo.owner = new PublicKey(accountInfo.owner)
  accountInfo.amount = u64.fromBuffer(accountInfo.amount)

  if (accountInfo.delegateOption === 0) {
    accountInfo.delegate = null
    accountInfo.delegatedAmount = new u64(0)
  } else {
    accountInfo.delegate = new PublicKey(accountInfo.delegate)
    accountInfo.delegatedAmount = u64.fromBuffer(accountInfo.delegatedAmount)
  }

  accountInfo.isInitialized = accountInfo.state !== 0
  accountInfo.isFrozen = accountInfo.state === 2

  if (accountInfo.isNativeOption === 1) {
    accountInfo.rentExemptReserve = u64.fromBuffer(accountInfo.isNative)
    accountInfo.isNative = true
  } else {
    accountInfo.rentExemptReserve = null
    accountInfo.isNative = false
  }

  if (accountInfo.closeAuthorityOption === 0) {
    accountInfo.closeAuthority = null
  } else {
    accountInfo.closeAuthority = new PublicKey(accountInfo.closeAuthority)
  }

  return accountInfo
}

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
)
const getMetadata = async (mint: PublicKey): Promise<PublicKey> => {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0]
}

const useMetadataAccounts = () => {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [metadataAccounts, setMetadataAccounts] = useState<any[]>()

  const fetchMetadataAccounts = async () => {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      wallet.publicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      }
    )

    const deserializedAccounts = tokenAccounts.value.map((account) =>
      deserializeAccount(Buffer.from(account.account.data))
    )

    const metadataAccountsPromises = deserializedAccounts.map(async (acc) => {
      const metadata = await getMetadata(acc.mint)

      const metadataAccountInfo = await connection.getAccountInfo(metadata)

      if (!metadataAccountInfo) return null

      const deserializedMetadataAccount = deserializeAccount(
        Buffer.from(metadataAccountInfo.data)
      )

      const data = new TextDecoder().decode(metadataAccountInfo.data)

      return {
        ...deserializedMetadataAccount,
        data,
      }
    })

    const metadataAccounts = await Promise.all(metadataAccountsPromises)
    const filtered = metadataAccounts.filter((value) => value !== null)

    setMetadataAccounts(filtered)
  }

  useEffect(() => {
    if (wallet.publicKey) {
      try {
        fetchMetadataAccounts()
      } catch (error) {
        console.log("Couldn't fetch metadata accounts! " + error)
      }
    }
  }, [wallet.publicKey])

  return { metadataAccounts, fetchMetadataAccounts }
}

export default useMetadataAccounts
