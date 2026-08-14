import { expect, type Locator, type Page } from "@playwright/test";
import { tegbTexts } from "../../../assets/dictionaries/dictionary.ts";

export class AccountDetailSection {
  private readonly page: Page;
  readonly accounts: Locator;
  readonly accountsHeader: Locator;
  readonly accountNumberHeading: Locator;
  readonly accountBalanceHeading: Locator;
  readonly accountTypeHeading: Locator;
  readonly accountNumberValue: Locator;
  readonly accountBalanceValue: Locator;
  readonly accountTypeValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accounts = page.locator("div[class='accounts']");
    this.accountsHeader = page.locator("h2[data-testid='accounts-title']");
    this.accountNumberHeading = page.locator(
      "th[data-testid='account-number-heading']"
    );
    this.accountBalanceHeading = page.locator(
      "th[data-testid='account-balance-heading']"
    );
    this.accountTypeHeading = page.locator(
      "th[data-testid='account-type-heading']"
    );
    this.accountNumberValue = page.locator("td[data-testid='account-number']");
    this.accountBalanceValue = page.locator(
      "td[data-testid='account-balance']"
    );
    this.accountTypeValue = page.locator("td[data-testid='account-type']");
  }

  async verifyAccountDetails(): Promise<AccountDetailSection> {
    await expect.soft(this.accountNumberHeading).toBeVisible();
    await expect
      .soft(this.accountNumberHeading)
      .toHaveText(tegbTexts.accounts.number);
    await expect.soft(this.accountNumberValue).toBeVisible();
    await expect.soft(this.accountBalanceHeading).toBeVisible();
    await expect
      .soft(this.accountBalanceHeading)
      .toHaveText(tegbTexts.accounts.balance);
    await expect.soft(this.accountBalanceValue).toBeVisible();
    await expect.soft(this.accountTypeHeading).toBeVisible();
    await expect
      .soft(this.accountTypeHeading)
      .toHaveText(tegbTexts.accounts.type);
    await expect.soft(this.accountTypeValue).toBeVisible();

    return this;
  }
}
