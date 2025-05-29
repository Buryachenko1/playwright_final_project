import { test, expect, type Locator, type Page } from "@playwright/test";
import { LoginPage } from "./login_page";
import { RegistrationPage } from "./registration_page";

export class DashboardPage {
  private readonly page: Page;
  private readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator("button[class='logout-link']");
  }

  async openTegB(): Promise<DashboardPage> {
    await this.page.goto(this.url);
    return this;
  }
  async verifyDashboardIsVisible(): Promise<DashboardPage> {
    await expect(this.page).toHaveURL(this.url);
    await expect(this.logoutButton).toBeVisible();
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await expect(this.logoutButton).toBeVisible();
    await expect(this.logoutButton).toHaveText("Odhlásit se");
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
