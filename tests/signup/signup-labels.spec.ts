import { expect, Locator, test } from '@playwright/test'
import { SignupPage } from '../../pages/SignupPage'
import { SignupLabelKey, signupLabels } from '../fixtures/signupLabels'

const fieldLocators = (page: SignupPage): Record<SignupLabelKey, Locator> => ({
  firstName: page.firstNameInput,
  lastName: page.lastNameInput,
  phoneNumber: page.phoneInput,
  email: page.emailInput,
  password: page.passwordInput,
  passwordConfirmation: page.passwordConfirmationInput
})

test.describe('Signup - Field labels', () => {
  test('field placeholders show the correct text in English', async ({ page }) => {
    const signupPage = new SignupPage(page)
    await signupPage.navigate('en')

    const locators = fieldLocators(signupPage)
    for (const field of Object.keys(locators) as SignupLabelKey[]) {
      await expect.soft(locators[field]).toHaveAttribute('placeholder', signupLabels[field].en)
    }
  })

  test('field placeholders show the correct text in French', async ({ page }) => {
    const signupPage = new SignupPage(page)
    await signupPage.navigate('fr')

    const locators = fieldLocators(signupPage)
    for (const field of Object.keys(locators) as SignupLabelKey[]) {
      await expect.soft(locators[field]).toHaveAttribute('placeholder', signupLabels[field].fr)
    }
  })
})
