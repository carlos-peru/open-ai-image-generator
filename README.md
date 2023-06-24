# open-ai-image-generator

## Setup

1. Make a copy of the example environment variables file

```bash
$ cp .env.example .env
```

2. Add your [API key](https://platform.openai.com/account/api-keys) to the newly created `.env` file

## Run it locally

```bash
yarn
yarn dev
```

You should now be able to access the app at http://localhost:3000

## Run Tests

### Run unit tests

```bash
$ yarn test:ci
```

### Run e2e tests

```bash
$ yarn cypress:run
```
