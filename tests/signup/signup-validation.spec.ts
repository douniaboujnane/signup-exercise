import test, { expect } from '@playwright/test'
import { SignupPage } from '../../pages/SignupPage'
import { createSignupData } from '../fixtures/signup'

test.describe('Signup - Field validation', () => {
  let signupPage: SignupPage

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page)
    await signupPage.navigate()
    await expect(page).toHaveURL('/signup')
  })

  test('blocks submit and shows an error for every field when the form is empty', async ({
    page
  }) => {
    await signupPage.submit()
    await expect(page).toHaveURL('/signup')
    await expect(signupPage.fieldErrorMessage('first-name')).toBeVisible()
    await expect(signupPage.fieldErrorMessage('last-name')).toBeVisible()
    await expect(signupPage.fieldErrorMessage('phone')).toBeVisible()
    await expect(signupPage.fieldErrorMessage('email')).toBeVisible()
    await expect(signupPage.fieldErrorMessage('password')).toBeVisible()
  })

  test('shows an error for an invalid email format', async ({ page }) => {
    const data = createSignupData({ email: 'not-valid-email' })
    await signupPage.fillForm(data)
    await signupPage.submit()
    await expect(page).toHaveURL('/signup')
    await expect(signupPage.fieldErrorMessage('email')).toBeVisible()
  })

  test('shows an error for an invalid phone number format', async ({ page }) => {
    const data = createSignupData({ phoneNumber: '1234' })
    await signupPage.fillForm(data)
    await signupPage.submit()
    await expect(page).toHaveURL('/signup')
    await expect(signupPage.fieldErrorMessage('phone')).toBeVisible()
  })

  test('shows an error for a password that does not meet the requirements', async ({ page }) => {
    const data = createSignupData({ password: 'not-valid-password' })
    await signupPage.fillForm(data)
    await signupPage.submit()
    await expect(page).toHaveURL('/signup')
    await expect(signupPage.fieldErrorMessage('password')).toBeVisible()
  })

  test('shows an error when password and confirmation do not match', async ({ page }) => {
    const data = createSignupData({ passwordConfirmation: 'not-valid-password-confirmation' })
    await signupPage.fillForm(data)
    await signupPage.submit()
    await expect(page).toHaveURL('/signup')
    await expect(signupPage.fieldErrorMessage('passwordConfirmation')).toBeVisible()
  })

  test('shows an error when password is present and confirmation password is empty', async ({
    page
  }) => {
    const data = createSignupData({ passwordConfirmation: undefined })
    await signupPage.fillForm(data)
    await signupPage.submit()
    await expect(page).toHaveURL('/signup')
    await expect(signupPage.fieldErrorMessage('passwordConfirmation')).toBeVisible()
  })
})
