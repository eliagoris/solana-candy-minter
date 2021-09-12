/** @jsxImportSource theme-ui */
import type { NextPage } from "next"
import Head from "next/head"
import { Heading, Text } from "theme-ui"
import dynamic from "next/dynamic"

import MintSection from "../components/MintSection/MintSection"
import SectionWrapper from "../components/Layout/SectionWrapper"
import TextWrapper from "../components/Layout/TextWrapper"

const WalletProvider = dynamic(
  () => import("../components/WalletProvider/WalletProvider"),
  {
    ssr: false,
  }
)

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Solsnatchers - Mint Your Own</title>
        <meta
          name="description"
          content="Mint NFTs from a candy machine on Solana blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SectionWrapper
          sx={{
            backgroundColor: "background3",
          }}
          as="header"
        >
          <Heading as="h1">SolSnatchers</Heading>
          <TextWrapper>
            <Text>
              A collection of 10,000 uniquely generated Grim Reapers existing
              eternally in the underworld of the Solana blockchain.
            </Text>
          </TextWrapper>
        </SectionWrapper>

        <WalletProvider>
          <MintSection />
        </WalletProvider>
      </main>
    </div>
  )
}

export default Home
