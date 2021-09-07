/** @jsxImportSource theme-ui */
import type { NextPage } from "next"
import Head from "next/head"
import { Container, Flex } from "theme-ui"
import dynamic from "next/dynamic"

const WalletProviderSection = dynamic(
  () => import("../components/WalletProviderSection/WalletProviderSection"),
  {
    ssr: false,
  }
)

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

      <Flex
        sx={{
          position: "sticky",
          height: "9rem",
          alignItems: "center",
        }}
      >
        <Container>
          <Flex
            sx={{
              justifyContent: "space-between",
              padding: "1.6rem 0",
            }}
          >
            <Flex
              sx={{
                verticalAlign: "middle",
                fontSize: "2.2rem",
                alignItems: "center",
                justifyContent: "center",
                width: "5rem",
                height: "5rem",
              }}
            >
              <a href="#">
                <img src="/images/logo.png" />
              </a>
            </Flex>
          </Flex>
        </Container>
      </Flex>

      <main>
        <Container>
          <header
            sx={{
              marginBottom: "6.4rem",
            }}
          >
            <h1>A Mighty Solana NFT Project</h1>
            <p>
              Mint your own unique NFT from our limited collecton now! Also,
              read more about our project <a href="#">here</a>
            </p>
          </header>
          <hr
            sx={{
              margin: "1.6rem 0",
            }}
          />

          <WalletProviderSection />
        </Container>
      </main>
    </div>
  )
}

export default Home
