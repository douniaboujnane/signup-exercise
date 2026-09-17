# nesto

Playwright + TypeScript test suite for the nesto signup flow (`/signup`) — UI (happy path, field validation, EN/FR) and API-level coverage.

## Setup

```sh
npm install
npx playwright install chromium
cp .env.example .env   # set BASE_URL and TEST_ACCOUNT_PASSWORD
```

## Running

```sh
npm test          # full suite (UI + API)
npm run report    # open the last HTML report
```

Full script list (UI mode, lint/format) in `package.json`.

Tests run on Chromium only — no cross-browser coverage configured.

## Structure

```
pages/            Page Objects — SignupPage, NavbarHeaderPage, BasePage
tests/
  signup/         Specs by concern: happy path, validation, labels, API
  fixtures/       Test data factories — form data, API payload, i18n labels
  helper/         Shared flows (runHappySignup)
```

Locators are role/testid-based for interaction; visible text is only asserted where content correctness itself is under test (labels, translated error messages) — see `pages/SignupPage.ts`.

## CI

GitHub Actions runs on every PR targeting `main` (see `.github/workflows/playwright.yml`):

- `lint` — formatting check (`prettier`) and TypeScript type check
- `e2e` — full Playwright suite (UI + API) against `BASE_URL`, Chromium only

Reports are uploaded as build artifacts (`playwright-report`, 30-day retention).

## Docs

- `ASSUMPTIONS.md` — judgment calls made while building this suite
- Bugs found on the target app: tracked as [GitHub issues labeled `bug`](https://github.com/douniaboujnane/nesto/issues?q=is%3Aissue+label%3Abug)
- Task tracking: [GitHub Project board](https://github.com/users/douniaboujnane/projects/2/views/1)
