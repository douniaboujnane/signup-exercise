import { test } from '@playwright/test'
import { runHappySignup } from '../support/signupFlow'

test.describe('Signup - Happy Path', () => {
  test('completes signup with valid data', { tag: '@en' }, async ({ page }) => {
    await runHappySignup(page)
  })
})
