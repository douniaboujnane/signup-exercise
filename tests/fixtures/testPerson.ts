import { randomUUID } from 'node:crypto'

export interface TestPerson {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
  region: string
}

function getDefaultPassword(): string {
  const password = process.env.TEST_ACCOUNT_PASSWORD
  if (!password) {
    throw new Error('Missing TEST_ACCOUNT_PASSWORD in .env')
  }
  return password
}

function getDefaultEmail(): string {
  return `qa-test+${randomUUID()}@gmail.com`
}

export function createTestPerson(overrides?: Partial<TestPerson>): TestPerson {
  return {
    firstName: 'Jane',
    lastName: 'Doe',
    email: getDefaultEmail(),
    password: getDefaultPassword(),
    phoneNumber: '5141234567',
    region: 'QC',
    ...overrides
  }
}
