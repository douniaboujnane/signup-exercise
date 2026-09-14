# Assumptions

## Cookie consent banner (Didomi)

`BasePage.dismissCookieBanner()` polls for up to 3s (300ms interval) before treating the banner as absent and continuing without error.

**Assumption:** its absence means consent was already recorded in a previous run, not a page-load issue.

**Revisit if:** Didomi ever takes longer to render — the timeout may need to increase.

## Post-signup redirect timeout

After a successful signup, the app redirects through an Auth0 OAuth exchange (`/getaquote/callback?code=...` → `/getaquote`) before landing on its final URL. The default 5s assertion timeout wasn't enough to cover that redirect chain, so `signup-happy-path.spec.ts` overrides it to 15s for that one assertion only (not the global `expect` timeout, to avoid slowing down failure detection on every other test).

**Assumption:** 15s comfortably covers the OAuth redirect chain under normal conditions; the value wasn't measured precisely, just picked with margin.

**Revisit if:** the auth flow gets slower (or flakier) and 15s stops being enough — worth measuring actual redirect duration instead of re-guessing a bigger number.

## See also

Product-side inconsistencies found while building this suite are tracked
as GitHub issues (label `bug`), not listed here as assumptions —
see #11, #12, #13.
