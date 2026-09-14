# Assumptions

## Cookie consent banner (Didomi)

`BasePage.dismissCookieBanner()` polls for up to 3s (300ms interval) before treating the banner as absent and continuing without error.

**Assumption:** its absence means consent was already recorded in a previous run, not a page-load issue.

**Revisit if:** Didomi ever takes longer to render — the timeout may need to increase.

## See also

Product-side inconsistencies found while building this suite are tracked
as GitHub issues (label `bug`), not listed here as assumptions —
see #11, #12, #13.
