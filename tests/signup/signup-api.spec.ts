import { expect, test } from '@playwright/test'
import { createAccountPayload } from '../fixtures/accountApiPayload'
import { attachJson } from '../helper/attachJson'

test.describe('Signup - API', () => {
  test('create an account successfuly', async ({ request }, testInfo) => {
    const payload = createAccountPayload()
    await attachJson(testInfo, 'request payload', payload)

    const response = await request.post('/api/accounts', { data: payload })
    const body = await response.json()
    await attachJson(testInfo, 'response body', body)

    expect(response.status()).toEqual(201)
    expect(body.account).toMatchObject({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      region: payload.region,
      preferredLanguage: payload.language
    })
  })

  test('reject an invalid email', async ({ request }, testInfo) => {
    const payload = createAccountPayload({ email: 'not-an-email' })
    await attachJson(testInfo, 'request payload', payload)

    const response = await request.post('/api/accounts', { data: payload })
    const body = await response.json()
    await attachJson(testInfo, 'response body', body)

    expect(response.status()).toEqual(422)
    expect(body.parameters).toContain('email')
  })
})
