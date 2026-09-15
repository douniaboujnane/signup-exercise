import { expect, test } from '@playwright/test'
import { SignupPage } from '../../pages/SignupPage'
import { SignupLabelKey, signupLabels } from '../fixtures/signupLabels'

const fieldLocators = (page: SignupPage) => ({
  firstName: page.firstNameInput,
  lastName: page.lastNameInput,
  phoneNumber: page.phoneInput,
  email: page.emailInput,
  password: page.passwordInput,
  passwordConfirmation: page.passwordConfirmationInput
})

test.describe('Signup - Field labels', () => {
  for (const locale of ['en', 'fr'] as const) {
    test(`field placeholders show the correct text (${locale})`, async ({ page }) => {
      const signupPage = new SignupPage(page)
      await signupPage.navigate(locale)

      const locators = fieldLocators(signupPage)
      for (const field of Object.keys(locators) as SignupLabelKey[]) {
        await expect(locators[field]).toHaveAttribute('placeholder', signupLabels[field][locale])
      }
    })
  }
})
