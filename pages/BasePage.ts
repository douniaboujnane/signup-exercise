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

    await agreeButton.click({ timeout: 3000 }).catch((error) => {
      if (!error.message.includes('Timeout')) throw error
    })
  }
}
