/** @jsxImportSource theme-ui */
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import React from "react"
import { Button, Flex, Spinner, Text } from "theme-ui"

import useCandyMachine from "../../hooks/useCandyMachine"
import useMinter from "../../hooks/useMinter"

type Props = {}

const MintButton = (props: Props) => {
  const wallet = useWallet()
  const { candyMachine } = useCandyMachine()
  const { isLoading, logs, mint, status } = useMinter()

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
          Candy machine address:{" "}
          <small>{process.env.NEXT_PUBLIC_CANDY_MACHINE_ADDRESS}</small>
        </p>
        {wallet.publicKey ? (
          <p>
            Wallet address: <small>{wallet.publicKey.toString()}</small>
          </p>
        ) : null}
        <p>
          Network:{" "}
          <small>
            {process.env.NEXT_PUBLIC_CONNECTION_NETWORK}&nbsp;
            {`https://api.${process.env.NEXT_PUBLIC_CONNECTION_NETWORK}.solana.com/`}
          </small>
        </p>
        <p>
          Go live date: <small>{goLiveDate.toLocaleString()} </small>
        </p>
      </Flex>
      <Flex
        sx={{
          margin: "3.2rem 0",
          gap: ".8rem",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Flex
          sx={{
            alignItems: "center",
            gap: ".8rem",
          }}
        >
          {isLoading && <Spinner size={16} strokeWidth={2} />}
          <Text>{status}&nbsp;</Text>
        </Flex>
        <Button
          onClick={wallet.publicKey ? () => mint() : () => false}
          disabled={!wallet.publicKey || !!isLoading}
          title="Mint one token"
        >
          {wallet.publicKey
            ? "Mint one token now!"
            : "Connect your wallet first"}
        </Button>
        {candyMachine?.data?.price ? (
          <small>
            Mint price:{" "}
            {candyMachine?.data?.price?.toNumber() / LAMPORTS_PER_SOL} SOL
          </small>
        ) : null}
      </Flex>
      <Flex
        sx={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {logs.map((log, i) => (
          <Text className="log" key={i}>
            <small>info</small>{" "}
            <Text dangerouslySetInnerHTML={{ __html: log }} />
          </Text>
        ))}
      </Flex>
    </div>
  )
}

export default MintButton
