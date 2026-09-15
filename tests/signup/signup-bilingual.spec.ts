import { expect, test } from '@playwright/test'
import { NavbarHeaderPage } from '../../pages/NavbarHeaderPage'
import { SignupPage } from '../../pages/SignupPage'
import { runHappySignup } from '../support/signupFlow'

test.describe('Signup - Bilingual', () => {
  test(
    'language switch navigates between EN and FR signup pages',
    { tag: ['@en', '@fr'] },
    async ({ page }) => {
      const signupPage = new SignupPage(page)
      const navbar = new NavbarHeaderPage(page)

      await signupPage.navigate()
      await expect(page).toHaveURL('/signup')

      await navbar.headerLangSwitch.click()
      await expect(page).toHaveURL('/fr/signup')
    }
  )

  test('completes signup with valid data in French', { tag: '@fr' }, async ({ page }) => {
    await runHappySignup(page, 'fr')
  })
})
