import { Locator, type Page, test, expect } from "@playwright/test";
import { RegistrationPage } from "./registration_page.ts";
import { DashboardPage } from "./dashboard_page.ts";

export class LoginPage {
  private readonly page: Page;
  private readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly registrationButton: Locator;
  private readonly registrationSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("input[data-testid='username-input']");
    this.passwordInput = page.locator("input[data-testid='password-input']");
    this.loginButton = page.locator("button[data-testid='submit-button']");
    this.registrationButton = page.locator(
      "button[data-testid='register-button']"
    );
    this.registrationSuccessMessage = page.locator(
      "div[data-testid='success-message']"
    );
  }

  async openTegB(): Promise<LoginPage> {
    await this.page.goto(this.url);
    return this;
  }

  async typeUsername(username: string): Promise<LoginPage> {
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(username);
    await expect(this.usernameInput).toHaveValue(username);
    return this;
  }
  async typePassword(password: string): Promise<LoginPage> {
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);
    return this;
  }
  async submitLoginForm(): Promise<DashboardPage> {
    await expect(this.loginButton).toBeVisible();
    await expect(this.loginButton).toHaveText("Přihlásit se");
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }
  async loginWithCredentials(
    username: string,
    password: string
  ): Promise<DashboardPage> {
    await this.typeUsername(username);
    await this.typePassword(password);
    return this.submitLoginForm();
  }
  async clickRegistration(): Promise<RegistrationPage> {
    await expect(this.registrationButton).toBeVisible();
    await this.registrationButton.click();
    return new RegistrationPage(this.page);
  }
  async verifyRegistrationSuccess(): Promise<LoginPage> {
    await expect(this.registrationSuccessMessage).toBeVisible();
    await expect(this.registrationSuccessMessage).toContainText(
      "Registrace úspěšná"
    );
    return this;
  }
}
