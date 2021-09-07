# solana-candies

Web application to mint tokens from a pre-generated Metaplex candy machine

## setup steps

1. Follow [these instructions](https://threadreaderapp.com/thread/1433816437525659658.html) until step 9.

2. With the candy machine created, you should grab its address.

3. Update the .env file with the following info:

```bash
# this is the address which is logged when you create the candy machine
NEXT_PUBLIC_CANDY_MACHINE_ADDRESS=your_candy_machine_address_here

# this is inside the file on .cache/ folder
NEXT_PUBLIC_CANDY_MACHINE_CACHE_PROGRAM_UUID=your_candy_machine_uuid_here

# this is inside the file on .cache/ folder
NEXT_PUBLIC_CANDY_MACHINE_CACHE_PROGRAM_CONFIG=your_candy_machine_config_address_here

# connection network
NEXT_PUBLIC_CONNECTION_NETWORK=devnet
```

4. Deploy the application.

5. Test out your minting proccess. If you followed the steps correctly, you should be able to mint tokens

6. Spread the word and have success with your project =)

## development steps

1. Install dependencies by running:

```bash
yarn
```

2. Run the development server:

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
