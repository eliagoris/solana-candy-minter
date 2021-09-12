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
        <title>Solana NFT Project - Mint Your Own</title>
        <meta
          name="description"
          content="A Solana NFT Project's official minting page. Get yourself an unique NFT from our collection now!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SectionWrapper backgroundColor="background3" as="header">
        <Heading as="h1">A Solana NFT Project</Heading>
        <TextWrapper>
          <Text>
            Our collection is made up of 3,000 unique NFTs, with attributes that
            defines every one of them an unique piece of art.{" "}
          </Text>
        </TextWrapper>
      </SectionWrapper>

      <WalletProvider>
        <MintSection />
      </WalletProvider>
    </div>
  )
}

export default Home
