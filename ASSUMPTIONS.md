# Assumptions

## Cookie consent banner (Didomi)

`BasePage.dismissCookieBanner()` waits up to 3s (polling every 300ms) for the banner, and just moves on if it's not there.

We're assuming that means consent was already given in an earlier run, not that the page failed to load. If Didomi ever gets slower to render, this timeout might need bumping up.

## Post-signup redirect timeout

After a successful signup, the app bounces through an Auth0 OAuth exchange (`/getaquote/callback?code=...` → `/getaquote`) before landing where it's supposed to. The default 5s wasn't enough to cover that whole chain, so we bumped it to 15s for that one assertion only — didn't want to slow down every other test by raising the global timeout for everyone.

15s was picked with some margin, not measured precisely. If the auth flow ever gets slower, this number will need revisiting.

## Bilingual (FR/EN) test scope

We only check that the signup flow behaves the same regardless of language — not that every string on the page is translated correctly. Checking every translation is really a job for comparing locale files against each other, not something E2E should be doing. It doesn't scale, and it belongs in the app's own repo/CI, not here.

So scope here is: rerun the happy path with `locale: 'fr'`, plus one test confirming the language switcher itself works (URL and content actually change on click).

## Negative test case scope

One or two negative cases per field (missing value, one bad format) is enough to prove the integration actually works — bad input blocks the form and an error shows up. We're not trying to cover every possible malformed input per field; that level of exhaustiveness should already live in unit tests on the app side.

If something slips through in production despite that, that's the signal this layer needs its own guard too.

Region and phone country don't get a negative test. Both come pre-filled on page load (Quebec / Canada), and there's no way through the UI to clear them back to empty — so there's no real "missing" state a user could ever hit. Still don't know for sure whether that default comes from geo-IP or is just hardcoded. Doesn't matter for us either way, since `fillForm` always sets them explicitly through the factory.

## Password rules hint text — no test written

The French version of this text is currently grammatically broken ("...doit contenir au entre 12 et 32 caractères...", filed as #20). Not writing a test for it yet — asserting the broken text as-is would pass but prove nothing, and asserting the correct text would just fail immediately, which isn't much better. Once #20 gets fixed, add the spot-check then.

## See also

Bugs found in the product while building this suite are tracked as GitHub issues (label `bug`), not listed here — see #11, #12, #13.
