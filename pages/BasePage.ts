import { Locator, Page } from '@playwright/test'

export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  protected async fillIfDefined(locator: Locator, value?: string) {
    if (value) await locator.fill(value)
  }

  protected async checkIfTrue(locator: Locator, value?: boolean) {
    if (value) await locator.check()
  }

  protected async selectIfDefined(locator: Locator, value?: string) {
    if (value) await locator.selectOption(value)
  }

  protected async dismissCookieBanner() {
    const agreeButton = this.page.locator('#didomi-notice-agree-button')
    const pollIntervalMs = 300
    const maxWaitMs = 3000
    const maxAttempts = maxWaitMs / pollIntervalMs

    // Polls with .count() (never throws, unlike .click()/.waitFor()) so a missing banner
    // (e.g. consent already given in a previous run) doesn't show up as a failed step in the report.
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if ((await agreeButton.count()) > 0) {
        await agreeButton.click()
        return
      }
      await this.page.waitForTimeout(pollIntervalMs)
    }
  }
}
