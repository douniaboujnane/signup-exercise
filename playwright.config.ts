import { defineConfig } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env') })

function getBaseURL(): string {
  const baseURL = process.env.BASE_URL
  if (!baseURL) {
    throw new Error('Missing BASE_URL in .env')
  }
  return baseURL
}

export default defineConfig({
  use: {
    baseURL: getBaseURL()
  },
  testDir: './tests',
  reporter: process.env.CI ? [['github'], ['html']] : 'html'
})
