import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@solana/wallet-adapter-react-ui/lib/Button"
import React from "react"
import { Flex } from "theme-ui"

import useCandyMachine from "../../hooks/useCandyMachine"
import { mintOneToken } from "../../lib/mint-one-token"

type Props = {}

const MintButton = (props: Props) => {
  const wallet = useWallet()
  const { candyMachine } = useCandyMachine()

  console.log(candyMachine?.data)

  const goLiveDate = candyMachine?.data.goLiveDate
    ? new Date(candyMachine?.data.goLiveDate.toNumber() * 1000)
    : "Not set"

  return (
    <div>
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Mint it</h2>
        <WalletMultiButton />
      </Flex>

      <Flex sx={{ flexDirection: "column" }}>
        <p>
          Candy machine address: {process.env.NEXT_PUBLIC_CANDY_MACHINE_ADDRESS}
        </p>
        {wallet.publicKey ? (
          <p>Wallet address: {wallet.publicKey.toString()}</p>
        ) : null}
        Go live date: {goLiveDate.toLocaleString()}
      </Flex>

      <Flex
        sx={{
          justifyContent: "center",
          margin: "1.6rem 0",
        }}
      >
        <Button
          onClick={wallet.publicKey ? () => mintOneToken(wallet) : () => false}
          disabled={!wallet.publicKey}
        >
          {wallet.publicKey
            ? "Mint one token now!"
            : "Connect your wallet first"}
        </Button>
      </Flex>
    </div>
  )
}

export default MintButton
