import { Locator, type Page, test, expect } from "@playwright/test";
import { LoginPage } from "./login_page";
import { DashboardPage } from "./dashboard_page";

export class RegistrationPage {
  private readonly page: Page;
  private readonly url =
    "https://tegb-frontend-88542200c6db.herokuapp.com/register";
  private readonly usernameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmRegistrationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("input[data-testid='username-input']");
    this.emailInput = page.locator("input[data-testid='email-input']");
    this.passwordInput = page.locator("input[data-testid='password-input']");
    this.confirmRegistrationButton = page.locator(
      "button[data-testid='submit-button']"
    );
  }

  async openRegistrationTegB(): Promise<RegistrationPage> {
    await this.page.goto(this.url);

    return this;
  }

  async typeUsername(username: string): Promise<RegistrationPage> {
    await this.usernameInput.fill(username);
    await expect(this.usernameInput).toHaveValue(username);

    return this;
  }

  async typePassword(password: string): Promise<RegistrationPage> {
    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);

    return this;
  }

  async typeEmail(email: string): Promise<RegistrationPage> {
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);

    return this;
  }
  async submitRegistrationForm(): Promise<LoginPage> {
    await expect(this.confirmRegistrationButton).toBeVisible();
    await this.confirmRegistrationButton.click();

    return new LoginPage(this.page);
  }
  async fillRegistrationForm(
    username: string,
    email: string,
    password: string
  ): Promise<RegistrationPage> {
    await this.typeUsername(username);
    await this.typeEmail(email);
    await this.typePassword(password);

    return this;
  }
}
