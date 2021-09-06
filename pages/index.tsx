import type { NextPage } from "next"
import Head from "next/head"
import { Button, Container } from "theme-ui"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Solana Candy Minter</title>
        <meta
          name="description"
          content="Mint NFTs from a candy machine on Solana blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <h1>Welcome to Solana Candy Minter</h1>

          <p>Click on the button to mint a NFT from a candy machine</p>

          <div>
            <Button>Mint!</Button>
          </div>
        </Container>
      </main>
    </div>
  )
}

export default Home
