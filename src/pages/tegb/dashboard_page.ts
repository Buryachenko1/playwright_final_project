import { test, expect, type Locator, type Page } from "@playwright/test";
import { LoginPage } from "./login_page";
import { tegbTexts } from "../../assets/dictionaries/dictionary";
// import { an } from "@faker-js/faker/dist/airline-BUL6NtOJ";  // Nepoužíváš, můžeš odstranit

export class DashboardPage {
  private readonly page: Page;
  private readonly url =
    "https://tegb-frontend-88542200c6db.herokuapp.com/dashboard";
  readonly headerLogo: Locator;
  readonly headerTitle: Locator;
  readonly headerLogoutButton: Locator;
  readonly profileHeader: Locator;
  private readonly accountsHeader: Locator;
  private readonly changeNameInput: Locator;
  private readonly changeSurnameInput: Locator;
  private readonly changeEmailInput: Locator;
  private readonly changePhoneInput: Locator;
  private readonly changeAgeInput: Locator;
  readonly editAccountButton: Locator;
  private readonly saveChangesButton: Locator;
  readonly accountSummary: Locator;
  readonly profileNameInput: Locator;
  readonly profileSurnameInput: Locator;
  readonly profileEmailInput: Locator;
  readonly profilePhoneInput: Locator;
  readonly profileAgeInput: Locator;
  readonly profileUpdateMessage: Locator;
  readonly accountNumberHeading: Locator;
  readonly accountBalanceHeading: Locator;
  readonly accountTypeHeading: Locator;
  readonly accountNumberValue: Locator;
  readonly accountBalanceValue: Locator;
  readonly accountTypeValue: Locator;
  readonly sidebar: Locator;
  readonly sidebarHomeItem: Locator;
  readonly sidebarAccountsItem: Locator;
  readonly sidebarTransactionsItem: Locator;
  readonly sidebarSupportItem: Locator;
  readonly footer: Locator;
  readonly footerText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.headerLogo = page.locator("img[data-testid='logo-img']");
    this.headerTitle = page.locator("span[class='app-title']");
    this.headerLogoutButton = page.locator("button[class='logout-link']");

    this.sidebar = page.locator("aside[class='dashboard-sidebar']");
    this.sidebarHomeItem = page.locator("nav ul li:nth-child(1)");
    this.sidebarAccountsItem = page.locator("nav ul li:nth-child(2)");
    this.sidebarTransactionsItem = page.locator("nav ul li:nth-child(3)");
    this.sidebarSupportItem = page.locator("nav ul li:nth-child(4)");

    this.accountSummary = page.locator("div[data-testid='account-summary']");
    this.profileHeader = page.locator(
      "h2[data-testid='profile-details-title']"
    );
    this.profileNameInput = page.locator("div[data-testid='name']");
    this.profileSurnameInput = page.locator("div[data-testid='surname']");
    this.profileEmailInput = page.locator("div[data-testid='email']");
    this.profilePhoneInput = page.locator("div[data-testid='phone']");
    this.profileAgeInput = page.locator("div[data-testid='age']");
    this.profileUpdateMessage = page.locator(
      "div[data-testid='update-message']"
    );
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
    this.changeNameInput = page.locator(
      "input[data-testid='chage-name-input']"
    );
    this.changeSurnameInput = page.locator(
      "input[data-testid='chage-surname-input']"
    );
    this.changeEmailInput = page.locator(
      "input[data-testid='chage-email-input']"
    );
    this.changePhoneInput = page.locator(
      "input[data-testid='chage-phone-input']"
    );
    this.changeAgeInput = page.locator("input[data-testid='chage-age-input']");

    this.editAccountButton = page.locator(
      "button[data-testid='toggle-edit-profile-button']"
    );
    this.saveChangesButton = page.locator(
      "button[data-testid='save-changes-button']"
    );
    this.footer = page.locator("footer[class='dashboard-footer']");
    this.footerText = page.locator("footer[class='dashboard-footer'] span");
  }

  async openTegB(): Promise<DashboardPage> {
    await this.page.goto(this.url);
    return this;
  }
  async verifyDashboardIsVisible(): Promise<DashboardPage> {
    await expect.soft(this.page).toHaveURL(this.url);
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

  async verifyProfileDetails(): Promise<DashboardPage> {
    await expect.soft(this.profileHeader).toBeVisible();
    await expect
      .soft(this.profileHeader)
      .toHaveText(tegbTexts.profile.detailsHeader);
    await expect.soft(this.profileNameInput).toBeVisible();
    await expect
      .soft(this.profileNameInput)
      .toContainText(tegbTexts.profile.name);
    await expect.soft(this.profileSurnameInput).toBeVisible();
    await expect
      .soft(this.profileSurnameInput)
      .toContainText(tegbTexts.profile.surname);
    await expect.soft(this.profileEmailInput).toBeVisible();
    await expect
      .soft(this.profileEmailInput)
      .toContainText(tegbTexts.profile.email);
    await expect.soft(this.profilePhoneInput).toBeVisible();
    await expect
      .soft(this.profilePhoneInput)
      .toContainText(tegbTexts.profile.phone);
    await expect.soft(this.profileAgeInput).toBeVisible();
    await expect
      .soft(this.profileAgeInput)
      .toContainText(tegbTexts.profile.age);
    await expect.soft(this.editAccountButton).toBeVisible();
    await expect
      .soft(this.editAccountButton)
      .toContainText(tegbTexts.profile.editButton);
    await expect.soft(this.editAccountButton).toBeEnabled();
    return this;
  }

  async verifyAccountDetails(): Promise<DashboardPage> {
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

  async clickEditAccount(): Promise<DashboardPage> {
    await expect(this.editAccountButton).toBeVisible();
    await expect
      .soft(this.editAccountButton)
      .toHaveText(tegbTexts.profile.editButton);
    await this.editAccountButton.click();
    return this;
  }

  async fillProfileName(name: string): Promise<DashboardPage> {
    await expect(this.changeNameInput).toBeVisible();
    await this.changeNameInput.pressSequentially(name);
    await expect(this.changeNameInput).toHaveValue(name, { timeout: 3000 });
    return this;
  }

  async fillProfileSurname(surname: string): Promise<DashboardPage> {
    await expect.soft(this.changeSurnameInput).toBeVisible();
    await this.changeSurnameInput.fill(surname);
    await expect
      .soft(this.changeSurnameInput)
      .toHaveValue(surname, { timeout: 2000 });
    return this;
  }

  async fillProfileEmail(email: string): Promise<DashboardPage> {
    await expect.soft(this.changeEmailInput).toBeVisible();
    await this.changeEmailInput.pressSequentially(email);
    await expect
      .soft(this.changeEmailInput)
      .toHaveValue(email, { timeout: 2000 });
    return this;
  }

  async fillProfilePhone(phone: string): Promise<DashboardPage> {
    await expect.soft(this.changePhoneInput).toBeVisible();
    await this.changePhoneInput.pressSequentially(phone);
    await expect
      .soft(this.changePhoneInput)
      .toHaveValue(phone, { timeout: 2000 });
    return this;
  }

  async fillProfileAge(age: string): Promise<DashboardPage> {
    await expect.soft(this.changeAgeInput).toBeVisible();
    await this.changeAgeInput.pressSequentially(age);
    await expect.soft(this.changeAgeInput).toHaveValue(age, { timeout: 2000 });
    return this;
  }

  async submitProfileChanges(): Promise<DashboardPage> {
    await expect.soft(this.saveChangesButton).toBeVisible();
    await expect.soft(this.saveChangesButton).toHaveText("Uložit změny");
    await this.saveChangesButton.click();
    return this;
  }
  //Test na vyplnění profilu není stabilní, občas selže, protože se nevyplní všechny hodnoty. Proto tato funkce
  async checkAndRefillProfile(
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: number
  ): Promise<DashboardPage> {
    const nameValue = (await this.changeNameInput.inputValue()).trim();
    const surnameValue = (await this.changeSurnameInput.inputValue()).trim();
    const emailValue = (await this.changeEmailInput.inputValue()).trim();
    const phoneValue = (await this.changePhoneInput.inputValue()).trim();
    const ageValue = (await this.changeAgeInput.inputValue()).trim();

    if (
      !nameValue ||
      !surnameValue ||
      !emailValue ||
      !phoneValue ||
      !ageValue
    ) {
      await this.fillAccountProfile(name, surname, email, phone, Number(age));
    }
    return this;
  }

  async fillAccountProfile(
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: number
  ): Promise<DashboardPage> {
    await this.clickEditAccount();
    await this.fillProfileName(name);
    await this.fillProfileSurname(surname);
    await this.fillProfileEmail(email);
    await this.fillProfilePhone(phone);
    await this.fillProfileAge(`${age}`);
    await this.submitProfileChanges();
    return this;
  }

  async verifyUpdateSuccess(): Promise<DashboardPage> {
    await expect.soft(this.profileUpdateMessage).toBeVisible();
    await expect
      .soft(this.profileUpdateMessage)
      .toHaveText("Profile updated successfully!");
    return this;
  }

  async verifyProfileChanges(
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: number
  ): Promise<DashboardPage> {
    await expect
      .soft(this.profileNameInput)
      .toHaveText(`${tegbTexts.profile.name} ${name}`);
    await expect
      .soft(this.profileSurnameInput)
      .toHaveText(`${tegbTexts.profile.surname} ${surname}`);
    await expect
      .soft(this.profileEmailInput)
      .toHaveText(`${tegbTexts.profile.email} ${email}`);
    await expect
      .soft(this.profilePhoneInput)
      .toHaveText(`${tegbTexts.profile.phone} ${phone}`);
    await expect
      .soft(this.profileAgeInput)
      .toHaveText(`${tegbTexts.profile.age} ${age}`);
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

  async verifyFooter(): Promise<DashboardPage> {
    await expect.soft(this.footer).toBeVisible();
    await expect.soft(this.footerText).toHaveText(tegbTexts.footer.copyright);
    return this;
  }
}
