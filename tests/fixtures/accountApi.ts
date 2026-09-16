import { randomUUID } from 'node:crypto'

export interface AccountApiPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  region: string
  language: 'en' | 'fr'
  password: string
  leadDistributeConsentAgreement: boolean
  formName: string
}

function getDefaultPassword(): string {
  const password = process.env.TEST_ACCOUNT_PASSWORD
  if (!password) {
    throw new Error('Missing TEST_ACCOUNT_PASSWORD in .env')
  }
  return password
}

export function createAccountPayload(overrides?: Partial<AccountApiPayload>): AccountApiPayload {
  return {
    firstName: 'Jane',
    lastName: 'Doe',
    email: `boujnane11+${randomUUID()}@hotmail.com`,
    phone: '+15141234567',
    region: 'QC',
    language: 'en',
    password: getDefaultPassword(),
    leadDistributeConsentAgreement: true,
    formName: 'signup',
    ...overrides
  }
}
