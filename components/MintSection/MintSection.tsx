/** @jsxImportSource theme-ui */
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import React from "react"
import { Button, Flex, Heading, Spinner, Text } from "theme-ui"
import Countdown from "react-countdown"

import useCandyMachine from "../../hooks/useCandyMachine"
import useMinter from "../../hooks/useMinter"
import SectionWrapper from "../Layout/SectionWrapper"

const MintSection = () => {
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

  const endpoint =
    process.env.NEXT_PUBLIC_CONNECTION_NETWORK == "devnet"
      ? process.env.NEXT_PUBLIC_SOLANA_RPC_HOST_DEVNET
      : process.env.NEXT_PUBLIC_SOLANA_RPC_HOST_MAINNET_BETA

  return (
    <SectionWrapper as="main">
      <Heading
        sx={{
          textAlign: "center",
        }}
        as="h2"
        variant="heading2"
      >
        Mint Your Own
      </Heading>
      <Text
        as="p"
        sx={{
          textAlign: "center",
        }}
      >
        Minting coming soon!
      </Text>
      {/* <WalletMultiButton /> */}

      <Flex
        sx={{
          border: "1px solid",
          borderRadius: ".4rem",
          padding: ".8rem 3.2rem",
          alignSelf: "flex-start",
          placeSelf: "center",
          borderColor: "primary",
        }}
      >
        <Text
          sx={{
            color: "primary",
          }}
        >
          {candyMachine?.data ? (
            goLiveDate && !isMintingReady ? (
              "Minting started already!"
            ) : goLiveDate ? (
              <Countdown date={goLiveDate?.getTime()} daysInHours={true} />
            ) : (
              "Live date not set"
            )
          ) : (
            <Spinner />
          )}
        </Text>
      </Flex>
      <Flex
        sx={{
          padding: "1.6rem 3.2rem",
          borderRadius: "0.8rem",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background2",
          gap: ".8rem",
        }}
      >
        <Heading as="h3">Single Mint</Heading>

        <Text>Mint one now!</Text>
        <Flex
          sx={{
            borderRadius: ".4rem",
            padding: ".4rem 3.2rem",
            alignSelf: "flex-start",
            placeSelf: "center",
            backgroundColor: "text",
          }}
        >
          <Text
            variant="small"
            sx={{
              color: "background",
            }}
          >
            {candyMachine?.data?.price ? (
              candyMachine?.data?.price?.toNumber() / LAMPORTS_PER_SOL + " SOL"
            ) : (
              <Spinner variant="styles.spinnerSmall" />
            )}
          </Text>
        </Flex>
        <Text>• 1x SolSnatcher ERC-732 NFT</Text>
        <Text>• Algorithmically generated with over 100 unique attributes</Text>

        <Flex
          sx={{
            alignItems: "center",
            gap: ".8rem",
          }}
        >
          {isLoading && <Spinner strokeWidth={2} />}
          <Text>{status}&nbsp;</Text>
        </Flex>

        <Button
          onClick={wallet.publicKey ? () => mint() : () => false}
          disabled={!wallet.publicKey || !!isLoading}
          title="Mint one token!"
        >
          {wallet.publicKey
            ? itemsRemaining
              ? "Mint one!"
              : "Sold out!"
            : "Connect your wallet first"}
        </Button>

        <Text variant="small" color="primary">
          {itemsRemaining ? (
            itemsRemaining + " grim reapers remaining"
          ) : (
            <Spinner variant="styles.spinnerSmall" />
          )}
        </Text>
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
    </SectionWrapper>
  )
}

export default MintSection
