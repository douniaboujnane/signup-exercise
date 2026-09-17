import { expect, test } from '@playwright/test'
import { NavbarHeaderPage } from '../../pages/NavbarHeaderPage'
import { SignupPage } from '../../pages/SignupPage'
import { runHappySignup } from '../helper/signupFlow'

test.describe('Signup - Happy Path', () => {
  test('complete signup with valid data in English', async ({ page }) => {
    await runHappySignup(page, 'en')
  })

  test('complete signup with valid data in French', async ({ page }) => {
    await runHappySignup(page, 'fr')
  })

  test('navigate between EN and FR signup pages', async ({ page }) => {
    const signupPage = new SignupPage(page)
    const navbar = new NavbarHeaderPage(page)

    await signupPage.navigate()
    await expect(page).toHaveURL(SignupPage.path.en)

    await navbar.headerLangSwitch.click()
    await expect(page).toHaveURL(SignupPage.path.fr)
  })
})
