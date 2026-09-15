import { expect, Page } from '@playwright/test'
import { SignupPage } from '../../pages/SignupPage'
import { createSignupData } from '../fixtures/signup'

export async function runHappySignup(page: Page, locale: 'en' | 'fr' = 'en') {
  const signupPage = new SignupPage(page)
  const data = createSignupData()

  await signupPage.navigate(locale)
  await expect(page).toHaveURL(SignupPage.path[locale])

  await signupPage.fillForm(data)
  await signupPage.submit()

  await expect(page).toHaveURL(SignupPage.successRedirectPath[locale], { timeout: 15000 })
}
