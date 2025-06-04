import { expect, type Locator, type Page } from "@playwright/test";
import { tegbTexts } from "../../assets/dictionaries/dictionary.ts";
import { LoginPage } from "./login_page.ts";
import { ProfileDetailSection } from "./dashboard-sections/profileDetailSection.ts";
import { AccountDetailSection } from "./dashboard-sections/accountDetailSection.ts";
import { baseUrl } from "../../config.ts";

export class DashboardPage {
  private readonly page: Page;
  public readonly baseUrl = baseUrl;

  readonly profileDetail: ProfileDetailSection;
  readonly accountDetail: AccountDetailSection;

  readonly headerLogo: Locator;
  readonly headerTitle: Locator;
  readonly headerLogoutButton: Locator;

  readonly sidebar: Locator;
  readonly sidebarHomeItem: Locator;
  readonly sidebarAccountsItem: Locator;
  readonly sidebarTransactionsItem: Locator;
  readonly sidebarSupportItem: Locator;

  readonly footer: Locator;
  readonly footerText: Locator;

  readonly dashboardUrl = `${this.baseUrl}/dashboard`;

  constructor(page: Page) {
    this.page = page;

    this.profileDetail = new ProfileDetailSection(page);
    this.accountDetail = new AccountDetailSection(page);

    this.headerLogo = page.locator("img[data-testid='logo-img']");
    this.headerTitle = page.locator("span[class='app-title']");
    this.headerLogoutButton = page.locator("button[class='logout-link']");

    this.sidebar = page.locator("aside[class='dashboard-sidebar']");
    this.sidebarHomeItem = page.locator("nav ul li:nth-child(1)");
    this.sidebarAccountsItem = page.locator("nav ul li:nth-child(2)");
    this.sidebarTransactionsItem = page.locator("nav ul li:nth-child(3)");
    this.sidebarSupportItem = page.locator("nav ul li:nth-child(4)");

    this.footer = page.locator("footer[class='dashboard-footer']");
    this.footerText = page.locator("footer[class='dashboard-footer'] span");
  }

  async openTegB(): Promise<DashboardPage> {
    await this.page.goto(this.dashboardUrl);
    return this;
  }

  async verifyDashboardHasUrl(): Promise<DashboardPage> {
    await expect.soft(this.page).toHaveURL(this.dashboardUrl);
    return this;
  }

  async verifyDashboardIsVisible(): Promise<DashboardPage> {
    await expect(this.headerLogo).toBeVisible();
    await expect(this.sidebar).toBeVisible();
    await expect(this.profileDetail.accountSummary).toBeVisible();
    await expect(this.accountDetail.accounts).toBeVisible();
    await expect(this.footer).toBeVisible();
    return this;
  }

  async verifyHeader(): Promise<DashboardPage> {
    await expect.soft(this.headerLogo).toBeVisible();
    await expect.soft(this.headerLogo).toHaveAttribute("src", "/logo.png");
    await expect.soft(this.headerTitle).toBeVisible();
    await expect.soft(this.headerTitle).toHaveText(tegbTexts.general.appHeader);
    await expect.soft(this.headerLogoutButton).toBeVisible();
    await expect.soft(this.headerLogoutButton).toBeEnabled();
    await expect
      .soft(this.headerLogoutButton)
      .toHaveText(tegbTexts.general.logout);
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await expect.soft(this.headerLogoutButton).toBeVisible();
    await expect
      .soft(this.headerLogoutButton)
      .toHaveText(tegbTexts.general.logout);
    await this.headerLogoutButton.click();
    return new LoginPage(this.page);
  }

  async verifySidebarItems(): Promise<DashboardPage> {
    await expect.soft(this.sidebar).toBeVisible();
    await expect.soft(this.sidebarHomeItem).toBeVisible();
    await expect.soft(this.sidebarHomeItem).toHaveText(tegbTexts.sidebar.home);
    await expect.soft(this.sidebarAccountsItem).toBeVisible();
    await expect
      .soft(this.sidebarAccountsItem)
      .toHaveText(tegbTexts.sidebar.accounts);
    await expect.soft(this.sidebarTransactionsItem).toBeVisible();
    await expect
      .soft(this.sidebarTransactionsItem)
      .toHaveText(tegbTexts.sidebar.transactions);
    await expect.soft(this.sidebarSupportItem).toBeVisible();
    await expect
      .soft(this.sidebarSupportItem)
      .toHaveText(tegbTexts.sidebar.support);
    return this;
  }

  async verifyFooter(): Promise<DashboardPage> {
    await expect.soft(this.footer).toBeVisible();
    await expect.soft(this.footerText).toHaveText(tegbTexts.footer.copyright);
    return this;
  }
}
