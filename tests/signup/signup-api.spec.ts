import test, { expect } from '@playwright/test'
import { createAccountPayload } from '../fixtures/accountApi'

test.describe('Signup - API', () => {
  test('creates an account successfuly', async ({ request }) => {
    const payload = createAccountPayload()

    const response = await request.post('/api/accounts', { data: payload })
    expect(response.status()).toEqual(201)

    const body = await response.json()
    expect(body.account).toMatchObject({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      region: payload.region,
      preferredLanguage: payload.language
    })
  })

  test('rejects an invalid email', async ({ request }) => {
    const payload = createAccountPayload({ email: 'not-an-email' })

    const response = await request.post('/api/accounts', { data: payload })
    expect(response.status()).toEqual(422)

    const body = await response.json()
    expect(body.parameters).toContain('email')
  })
})
