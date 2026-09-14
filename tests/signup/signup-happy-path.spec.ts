import { expect, test } from '@playwright/test'
import { SignupPage } from '../../pages/SignupPage'
import { createSignupData } from '../fixtures/signup'

test.describe('Signup - Happy Path', () => {
  test('completes signup with valid data', async ({ page }) => {
    const signupPage = new SignupPage(page)
    const data = createSignupData()

    await signupPage.navigate()
    await expect(page).toHaveURL(SignupPage.path.en)

    await signupPage.fillForm(data)
    await signupPage.submit()

    await expect(page).toHaveURL(SignupPage.successRedirectPath, { timeout: 15000 })
  })
})
