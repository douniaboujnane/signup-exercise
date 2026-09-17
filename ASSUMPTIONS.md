# Assumptions

## Cookie consent banner

Skipping this call breaks things. Suite hits the signup page and starts filling the form with no pause, so if the banner's still up it gets in the way and tests flakes.

dismissCookieBanner() clicks the agree button, 3s timeout, swallows the error if nothing shows up (consent already given from a previous run probably).

## Post-signup redirect timeout

Signup goes through an Auth0 exchange (/getaquote/callback?code=... -> /getaquote) before it actually lands. Default timeout wasn't enough for that, bumped it to 15s just on that one assertion in runHappySignup, not globally.

## Field validation coverage

Field level input validation (allowed characters, format rules) is normally something unit tests should cover exhaustively at the component level - fast and easy to enumerate every case. E2E tests here sample a representative invalid case per field rather than exhaustively retesting every validation rule, since that's not what this layer is for.
