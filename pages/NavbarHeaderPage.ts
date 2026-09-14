import { BasePage } from './BasePage'

export class NavbarHeaderPage extends BasePage {
  get headerLangSwitch() {
    return this.page.getByTestId('header-language-switch')
  }

  get headerLoginButton() {
    return this.page.getByTestId('header-login-button')
  }
}
