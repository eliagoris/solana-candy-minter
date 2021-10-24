# solana-candy-minter

Web application to mint tokens from a Metaplex candy machine

## prerequisites

- NodeJS - install through [NVM](https://github.com/nvm-sh/nvm)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)


## setup steps

1. Setup a [Metaplex candy machine](https://github.com/metaplex-foundation/metaplex/tree/master/js/packages/cli)

- Following [these instructions](https://threadreaderapp.com/thread/1433816437525659658.html) until step 9 may help.

2. With the candy machine created, you should grab its address and also the config address.

3. Deploy the application. The suggested platform is [Vercel](https://vercel.com/new)

4. These variables have to be added to your production deployment environment variables:

```bash

# this is the address that is logged when you create the candy machine
NEXT_PUBLIC_CANDY_MACHINE_ADDRESS=

# these are inside the cache file on metaplex .cache/ folder
NEXT_PUBLIC_CANDY_MACHINE_CACHE_PROGRAM_UUID=
NEXT_PUBLIC_CANDY_MACHINE_CACHE_PROGRAM_CONFIG=

# connection type - options are devnet and mainnet-beta
NEXT_PUBLIC_CONNECTION_NETWORK=

# rpc http endpoints (ex: https://api.devnet.solana.com)
NEXT_PUBLIC_SOLANA_RPC_HOST_DEVNET=
NEXT_PUBLIC_SOLANA_RPC_HOST_MAINNET_BETA=

# analytics tracking code
NEXT_PUBLIC_GA_ID=
```

5. Test out your minting process. If you followed the steps correctly, you should be able to mint tokens.

6. Change the `styles/theme.ts` file to easily match your own design.

7. Spread the word and have success with your project =)

## development steps

1. Install dependencies by running:

```bash
yarn
```

2. Add environment variables to `.env.local`. (copy from `.env.template`)

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
