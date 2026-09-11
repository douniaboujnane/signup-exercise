# nesto

End-to-end tests with [Playwright](https://playwright.dev/) and TypeScript.

## Prerequisites

- [Node.js](https://nodejs.org/)

## Install

```sh
npm install
npx playwright install
```

## Configuration

Environment variables are loaded from a `.env` file at the project root (not committed to git). See `.env.example` if present for the expected keys.

## Usage

Run the test suite:

```sh
npm test
```

Run tests in interactive UI mode:

```sh
npm run test:ui
```

Run tests in debug mode:

```sh
npm run test:debug
```

Open the HTML report from the last run:

```sh
npm run report
```

Type-check the project without emitting output:

```sh
npm run tsc
```

Format the codebase with Prettier:

```sh
npm run format
```

Check formatting without writing changes:

```sh
npm run format:check
```

## Project structure

```
tests/                 Test specs
playwright.config.ts   Playwright configuration
tsconfig.json          TypeScript configuration
```
