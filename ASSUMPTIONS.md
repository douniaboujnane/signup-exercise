# Assumptions

## Cookie consent banner (Didomi)

`BasePage.dismissCookieBanner()` polls for up to 3s (300ms interval) before treating the banner as absent and continuing without error.

**Assumption:** its absence means consent was already recorded in a previous run, not a page-load issue.

**Revisit if:** Didomi ever takes longer to render — the timeout may need to increase.

## Post-signup redirect timeout

After a successful signup, the app redirects through an Auth0 OAuth exchange (`/getaquote/callback?code=...` → `/getaquote`) before landing on its final URL. The default 5s assertion timeout wasn't enough to cover that redirect chain, so `signup-happy-path.spec.ts` overrides it to 15s for that one assertion only (not the global `expect` timeout, to avoid slowing down failure detection on every other test).

**Assumption:** 15s comfortably covers the OAuth redirect chain under normal conditions; the value wasn't measured precisely, just picked with margin.

## Bilingual (FR/EN) test scope

E2E tests only verify that the signup flow **behaves the same regardless of locale** — not that every string on every page is correctly translated. That's a translation-file completeness problem (comparing key sets between locale files), which doesn't scale as E2E and belongs in the app's own repo/CI, not this test suite.

**In scope here:** happy path re-run with `locale: 'fr'`, and one test that the language switcher itself works (URL/content actually changes on click).

## Negative test case scope

One or two representative negative cases per field (missing, one invalid-format example) is enough to verify the integration — that invalid input actually blocks submit and actually surfaces a visible error in the real UI. Exhaustive format edge-case coverage is assumed to already live in unit tests.

**Revisit if:** a specific edge case turns out to slip through in production despite passing whatever unit coverage exists — that's a signal this integration layer needs to explicitly guard against it too.

**Region and phone country are excluded from the "missing field" test.** Both come pre-selected on page load (Quebec / Canada) and can't be reset to blank through the UI — there's no real "missing" state a user could ever produce, so no negative test is possible or meaningful for them. Open question: whether that default is hardcoded or derived from browser locale/geo-IP — untested either way, but not a risk today since `fillForm` always selects them explicitly via the factory rather than relying on the default.

## Password rules hint text — no test written

The FR password rules hint text is currently grammatically broken ("...doit contenir au entre 12 et 32 caractères...", filed as #20). No test asserts this text, on purpose: writing one now means choosing between asserting the broken text as-is (the test would pass but validate nothing — it'd just confirm the bug still exists) or asserting the correct text (the test would fail immediately, which is accurate but adds a known-red test to the suite rather than a real regression signal). Neither is useful right now. Once #20 is fixed, add a spot-check asserting the correct text in both locales.

## See also

Product-side inconsistencies found while building this suite are tracked
as GitHub issues (label `bug`), not listed here as assumptions —
see #11, #12, #13.
