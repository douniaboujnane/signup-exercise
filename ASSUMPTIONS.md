# Assumptions

## Cookie consent banner (Didomi)

`BasePage.dismissCookieBanner()` polls for up to 3s (300ms interval) before treating the banner as absent and continuing without error.

**Assumption:** its absence means consent was already recorded in a previous run, not a page-load issue.

**Revisit if:** Didomi ever takes longer to render — the timeout may need to increase.

## Post-signup redirect timeout

After a successful signup, the app redirects through an Auth0 OAuth exchange (`/getaquote/callback?code=...` → `/getaquote`) before landing on its final URL. The default 5s assertion timeout wasn't enough to cover that redirect chain, so `signup-happy-path.spec.ts` overrides it to 15s for that one assertion only (not the global `expect` timeout, to avoid slowing down failure detection on every other test).

**Assumption:** 15s comfortably covers the OAuth redirect chain under normal conditions; the value wasn't measured precisely, just picked with margin.

**Revisit if:** the auth flow gets slower (or flakier) and 15s stops being enough — worth measuring actual redirect duration instead of re-guessing a bigger number.

## Bilingual (FR/EN) test scope

E2E tests only verify that the signup flow **behaves the same regardless of locale** — not that every string on every page is correctly translated. That's a translation-file completeness problem (comparing key sets between locale files), which doesn't scale as E2E and belongs in the app's own repo/CI, not this test suite.

**In scope here (#8):** happy path re-run with `locale: 'fr'`, and one test that the language switcher itself works (URL/content actually changes on click).

**Out of scope:** asserting every field label/error message is translated on every page. A handful of targeted spot-checks (e.g. the password rules text) is enough — see #6/#7.

**Revisit if:** the app adds a third locale — this scope still holds (functional flow + switcher), no new E2E tests needed per language unless a critical flow needs guaranteed coverage in that language too.

## See also

Product-side inconsistencies found while building this suite are tracked
as GitHub issues (label `bug`), not listed here as assumptions —
see #11, #12, #13.
