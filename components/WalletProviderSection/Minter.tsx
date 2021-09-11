/** @jsxImportSource theme-ui */
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import React from "react"
import { Button, Flex, Spinner, Text } from "theme-ui"
import Countdown from "react-countdown"

import useCandyMachine from "../../hooks/useCandyMachine"
import useMinter from "../../hooks/useMinter"

type Props = {}

const MintButton = (props: Props) => {
  const wallet = useWallet()
  const { candyMachine } = useCandyMachine()
  const { isLoading, logs, mint, status } = useMinter()

  const goLiveDate = candyMachine?.data.goLiveDate
    ? new Date(candyMachine?.data.goLiveDate.toNumber() * 1000)
    : null

  const isMintingReady =
    goLiveDate && goLiveDate.getTime() < new Date().getTime()

  const itemsRemaining =
    candyMachine?.data?.itemsAvailable?.toNumber() -
    candyMachine?.itemsRedeemed?.toNumber()

  const endpoint = process.env.NEXT_PUBLIC_CONNECTION_NETWORK == 'devnet' ? 
                   process.env.NEXT_PUBLIC_SOLANA_RPC_HOST_DEVNET : 
                   process.env.NEXT_PUBLIC_SOLANA_RPC_HOST_MAINNET_BETA

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
          </small>
        </p>
        <p>
          RPC Endpoint:{" "}
          <small>
          {endpoint}
          </small>
        </p>
        <br />
        <p>
          Go live date:{" "}
          <small>{goLiveDate ? goLiveDate.toLocaleString() : "Not set"} </small>
        </p>
        <p>
          Countdown:{" "}
          <small>
            {goLiveDate && isMintingReady ? (
              "Minting started already!"
            ) : goLiveDate ? (
              <Countdown date={goLiveDate?.getTime()} daysInHours={true} />
            ) : (
              "Live date not set"
            )}
          </small>
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
            ? itemsRemaining
              ? "Mint one token now!"
              : "Sold out!"
            : "Connect your wallet first"}
        </Button>
        <Button
          onClick={wallet.publicKey ? () => mint(3) : () => false}
          disabled={!wallet.publicKey || !!isLoading}
          title="Mint 3 tokens"
        >
          {wallet.publicKey
            ? itemsRemaining
              ? "Mint 3 tokens now!"
              : "Sold out!"
            : "Connect your wallet first"}
        </Button>
        {candyMachine?.data?.price ? (
          <small>
            Mint price:{" "}
            {candyMachine?.data?.price?.toNumber() / LAMPORTS_PER_SOL} SOL
          </small>
        ) : null}
        {itemsRemaining ? (
          <small>{itemsRemaining} mints remaining</small>
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
