# Assumptions

## Cookie consent banner

Skipping this call breaks things. Suite hits the signup page and starts filling the form with no pause, so if the banner's still up it gets in the way and tests flakes.

dismissCookieBanner() clicks the agree button, 3s timeout, swallows the error if nothing shows up (consent already given from a previous run probably).

## Post-signup redirect timeout

Signup goes through an Auth0 exchange (/getaquote/callback?code=... -> /getaquote) before it actually lands. Default timeout wasn't enough for that, bumped it to 15s just on that one assertion in runHappySignup, not globally.
