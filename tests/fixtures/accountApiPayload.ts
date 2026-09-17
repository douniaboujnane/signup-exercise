import { createTestPerson } from './testPerson'

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

export function createAccountPayload(overrides?: Partial<AccountApiPayload>): AccountApiPayload {
  const person = createTestPerson()

  return {
    firstName: person.firstName,
    lastName: person.lastName,
    email: person.email,
    phone: `+1${person.phoneNumber}`,
    region: person.region,
    language: 'en',
    password: person.password,
    leadDistributeConsentAgreement: true,
    formName: 'signup',
    ...overrides
  }
}
