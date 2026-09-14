import { randomUUID } from 'node:crypto'

export interface SignupFormData {
  firstName?: string
  lastName?: string
  phoneCountry?: string
  phoneNumber?: string
  region?: string
  email?: string
  password?: string
  passwordConfirmation?: string
  agreeToTerms?: boolean
}

function getDefaultPassword(): string {
  const password = process.env.TEST_ACCOUNT_PASSWORD
  if (!password) {
    throw new Error('Missing TEST_ACCOUNT_PASSWORD in .env')
  }
  return password
}

export function createSignupData(overrides?: Partial<SignupFormData>): SignupFormData {
  const password = getDefaultPassword()

  return {
    firstName: 'Jane',
    lastName: 'Doe',
    phoneCountry: 'CA',
    phoneNumber: '5141234567',
    region: 'QC',
    email: `boujnane11+${randomUUID()}@hotmail.com`,
    password,
    passwordConfirmation: password,
    agreeToTerms: true,
    ...overrides
  }
}
