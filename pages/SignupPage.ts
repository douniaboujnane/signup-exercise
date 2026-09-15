import { SignupFormData } from '../tests/fixtures/signup'
import { BasePage } from './BasePage'

export class SignupPage extends BasePage {
  static readonly path = {
    en: '/signup',
    fr: '/fr/signup'
  }

  static readonly successRedirectPath = {
    en: '/getaquote',
    fr: '/getaquote/fr'
  }

  get firstNameInput() {
    return this.page.getByTestId('first-name-input')
  }

  get lastNameInput() {
    return this.page.getByTestId('last-name-input')
  }

  get phoneInputCountrySelect() {
    return this.page.getByRole('combobox', { name: 'Phone number country' })
  }

  get phoneInput() {
    return this.page.getByTestId('phoneInput')
  }

  get regionSelect() {
    return this.page.getByTestId('region-select')
  }

  get emailInput() {
    return this.page.getByTestId('email-input')
  }

  get passwordInput() {
    return this.page.getByTestId('password-input')
  }

  get passwordConfirmationInput() {
    return this.page.getByTestId('passwordConfirmation-input')
  }

  get agreementCheckbox() {
    return this.page.getByTestId('agreement-checkbox')
  }

  get submitButton() {
    return this.page.getByTestId('submit-button')
  }

  get loginLink() {
    return this.page.getByTestId('login-link')
  }

  get termsOfServiceLink() {
    return this.page.getByTestId('terms-link')
  }

  get privacyPolicyLink() {
    return this.page.getByRole('link', { name: /Privacy Policy|politique de confidentialité/i })
  }

  fieldErrorMessage(fieldName: string) {
    return this.page.getByTestId(`${fieldName}-error-message-typography`)
  }

  async navigate(locale: 'en' | 'fr' = 'en') {
    await this.page.goto(SignupPage.path[locale])
    await this.dismissCookieBanner()
  }

  async fillForm(data: SignupFormData) {
    await this.fillIfDefined(this.firstNameInput, data.firstName)
    await this.fillIfDefined(this.lastNameInput, data.lastName)
    await this.selectIfDefined(this.phoneInputCountrySelect, data.phoneCountry)
    await this.fillIfDefined(this.phoneInput, data.phoneNumber)
    await this.selectIfDefined(this.regionSelect, data.region)
    await this.fillIfDefined(this.emailInput, data.email)
    await this.fillIfDefined(this.passwordInput, data.password)
    await this.fillIfDefined(this.passwordConfirmationInput, data.passwordConfirmation)
    await this.checkIfTrue(this.agreementCheckbox, data.agreeToTerms)
  }

  async submit() {
    await this.submitButton.click()
  }
}
