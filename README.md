# nesto

Playwright + TypeScript test suite for the nesto signup flow (`/signup`) — UI (positive/negative/bilingual) and API-level coverage.

## Setup

```sh
npm install
npx playwright install chromium
cp .env.example .env   # set BASE_URL and TEST_ACCOUNT_PASSWORD
```

## Running

```sh
npm test          # full suite
npm run test:en   # English-tagged UI tests
npm run test:fr   # French-tagged UI tests
npm run test:api  # API tests, no browser
npm run report    # open the last HTML report
```

Full script list (UI mode, debug mode, lint/format) in `package.json`.

Tests run on Chromium only — no cross-browser coverage configured.

## Structure

```
pages/            Page Objects — SignupPage, NavbarHeaderPage, BasePage
tests/
  signup/         Specs by concern: happy path, validation, bilingual, labels, API
  fixtures/       Test data factories — signup form data, account API payload, i18n labels
  support/        Shared flows (runHappySignup)
```

Locators are role/testid-based for interaction; visible text is only asserted where content correctness itself is under test (labels, translated error messages) — see `pages/SignupPage.ts`.

## Docs

- `ASSUMPTIONS.md` — judgment calls made while building this suite
- Bugs found on the target app: `BUG_REPORT.md`
