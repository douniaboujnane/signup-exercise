import { createTestPerson } from './testPerson'

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

export function createSignupData(overrides?: Partial<SignupFormData>): SignupFormData {
  const person = createTestPerson()

  return {
    firstName: person.firstName,
    lastName: person.lastName,
    phoneCountry: 'CA',
    phoneNumber: person.phoneNumber,
    region: person.region,
    email: person.email,
    password: person.password,
    passwordConfirmation: person.password,
    agreeToTerms: true,
    ...overrides
  }
}
