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
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        Go live date:{" "}
        {goLiveDate ? (
          goLiveDate?.toLocaleString()
        ) : (
          <Spinner
            sx={{
              marginLeft: ".8rem",
            }}
          />
        )}
      </Text>

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
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background2",
          gap: ".8rem",
        }}
      >
        <Flex>
          <Heading as="h3">Single Mint</Heading>
        </Flex>

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

        <Flex
          sx={{
            alignItems: "center",
            gap: ".8rem",
          }}
        >
          {isLoading && <Spinner strokeWidth={2} />}
          <Text>{status}&nbsp;</Text>
        </Flex>

        <Flex
          sx={{
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center",

            ".wallet-adapter-dropdown": {
              display: "flex",
              flex: 1,
              justifyContent: "center",
            },

            ".wallet-adapter-button[disabled]": {
              backgroundColor: "#141221 !important",
              opacity: 0.7,
            },
          }}
        >
          <Flex
            sx={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <span
              sx={{
                marginRight: "auto",
              }}
            >
              &nbsp;
            </span>
          </Flex>
          {wallet?.publicKey ? (
            <Button
              onClick={() => mint()}
              disabled={!wallet.publicKey || !!isLoading}
              title="Mint one token!"
              sx={{
                alignSelf: "center",
                padding: ".8rem 6.4rem",
                display: "flex",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text variant="text.heading3">
                {candyMachine?.data ? (
                  itemsRemaining ? (
                    "Mint one!"
                  ) : (
                    "Sold out!"
                  )
                ) : (
                  <Spinner
                    sx={{
                      color: "background",
                    }}
                  />
                )}
              </Text>
            </Button>
          ) : (
            <WalletMultiButton
              sx={{
                backgroundColor: "background3",
                border: "1px solid transparent",
                transition: "all .3s linear",
                color: "heading",
                lineHeight: "body",
                fontSize: "1.7rem",
                padding: ".8rem 6.4rem",
                height: "unset",
                alignSelf: "flex-end",

                "&:hover": {
                  bg: "background",
                  color: "primary",
                  borderColor: "primary",
                  cursor: "pointer",
                },
              }}
            />
          )}

          <Flex
            sx={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            {wallet?.publicKey ? (
              <WalletMultiButton
                sx={{
                  backgroundColor: "none",
                  background: "none",
                  transition: "all .3s linear",
                  color: "heading",
                  lineHeight: "body",
                  fontSize: "1.1rem",
                  padding: "0",
                  height: "unset",
                  alignSelf: "flex-end",
                  marginLeft: "auto",

                  "&:hover": {
                    background: "none!important",
                    backgroundColor: "none!important",
                    color: "primary",
                    borderColor: "primary",
                    cursor: "pointer",
                  },
                }}
                startIcon={null}
              >
                my wallet
              </WalletMultiButton>
            ) : (
              <span
                sx={{
                  marginLeft: "auto",
                }}
              >
                &nbsp;
              </span>
            )}
          </Flex>
        </Flex>

        <Text variant="small" color="primary">
          {itemsRemaining ? (
            itemsRemaining + " pieces remaining"
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
