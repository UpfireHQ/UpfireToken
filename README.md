# UpfireToken

Repository for Upfire's new token and the token swap portal.

## How to deploy the token to Mainnet?

1. Copy the `.env.example` file:

```shell
cp .env.example .env
```

2. Fill in the required variables for Mainnet.

3. Run `npx hardhat compile`

4. Run `npx hardhat deployUpfireToken --network mainnet`

5. Verify the contract on Etherscan by running `npx hardhat verify --network mainnet <deployed-token-address>`