import { test, expect, type Locator, type Page } from "@playwright/test";
import { LoginPage } from "./login_page";
import { RegistrationPage } from "./registration_page";
import { an } from "@faker-js/faker/dist/airline-BUL6NtOJ";

export class DashboardPage {
  private readonly page: Page;
  private readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";
  private readonly logoutButton: Locator;
  private readonly profileHeader: Locator;
  private readonly accountsHeader: Locator;
  private readonly changeNameInput: Locator;
  private readonly changeSurnameInput: Locator;
  private readonly changeEmailInput: Locator;
  private readonly changePhoneInput: Locator;
  private readonly changeAgeInput: Locator;
  private readonly editAccountButton: Locator;
  private readonly saveChangesButton: Locator;
  private readonly profileNameInput: Locator;
  private readonly profileSurnameInput: Locator;
  private readonly profileEmailInput: Locator;
  private readonly profilePhoneInput: Locator;
  private readonly profileAgeInput: Locator;
  private readonly profileUpdateMessage: Locator;
  private readonly accountNumberHeading: Locator;
  private readonly accountBalanceHeading: Locator;
  private readonly accountTypeHeading: Locator;
  private readonly accountNumberValue: Locator;
  private readonly accountBalanceValue: Locator;
  private readonly accountTypeValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator("button[class='logout-link']");
    this.profileHeader = page.locator(
      "h2[data-testid='profile-details-title']"
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
    this.profileNameInput = page.locator("div[data-testid='name']");
    this.profileSurnameInput = page.locator("div[data-testid='surname']");
    this.profileEmailInput = page.locator("div[data-testid='email']");
    this.profilePhoneInput = page.locator("div[data-testid='phone']");
    this.profileAgeInput = page.locator("div[data-testid='age']");
    this.profileUpdateMessage = page.locator(
      "div[data-testid='update-message']"
    );
  }

  async openTegB(): Promise<DashboardPage> {
    await this.page.goto(this.url);
    return this;
  }
  async verifyDashboardIsVisible(): Promise<DashboardPage> {
    await expect(this.page).toHaveURL(this.url);
    await expect(this.logoutButton).toBeVisible();
    await expect(this.profileHeader).toBeVisible();
    await expect(this.accountsHeader).toBeVisible();
    return this;
  }
  async verifyAccountDetails(): Promise<DashboardPage> {
    await expect(this.accountNumberHeading).toBeVisible();
    await expect(this.accountNumberHeading).toHaveText("Číslo účtu");
    await expect(this.accountNumberValue).toBeVisible();
    await expect(this.accountBalanceHeading).toBeVisible();
    await expect(this.accountBalanceHeading).toHaveText("Zůstatek");
    await expect(this.accountBalanceValue).toBeVisible();
    await expect(this.accountTypeHeading).toBeVisible();
    await expect(this.accountTypeHeading).toHaveText("Typ účtu");
    await expect(this.accountTypeValue).toBeVisible();

    return this;
  }
  async clickEditAccount(): Promise<DashboardPage> {
    await expect(this.editAccountButton).toBeVisible();
    await expect(this.editAccountButton).toHaveText("Upravit profil");
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
    await expect(this.changeSurnameInput).toBeVisible();
    await this.changeSurnameInput.fill(surname);
    await expect(this.changeSurnameInput).toHaveValue(surname, {
      timeout: 2000,
    });
    return this;
  }
  async fillProfileEmail(email: string): Promise<DashboardPage> {
    await expect(this.changeEmailInput).toBeVisible();
    await this.changeEmailInput.pressSequentially(email);
    await expect(this.changeEmailInput).toHaveValue(email, { timeout: 2000 });
    return this;
  }
  async fillProfilePhone(phone: string): Promise<DashboardPage> {
    await expect(this.changePhoneInput).toBeVisible();
    await this.changePhoneInput.pressSequentially(phone);
    await expect(this.changePhoneInput).toHaveValue(phone, { timeout: 2000 });
    return this;
  }
  async fillProfileAge(age: string): Promise<DashboardPage> {
    await expect(this.changeAgeInput).toBeVisible();
    await this.changeAgeInput.pressSequentially(age);
    await expect(this.changeAgeInput).toHaveValue(age, { timeout: 2000 });
    return this;
  }

  async submitProfileChanges(): Promise<DashboardPage> {
    await expect(this.saveChangesButton).toBeVisible();
    await expect(this.saveChangesButton).toHaveText("Uložit změny");
    await this.saveChangesButton.click();
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
    await expect(this.profileUpdateMessage).toBeVisible();
    await expect(this.profileUpdateMessage).toHaveText(
      "Profile updated successfully!"
    );
    return this;
  }

  async verifyProfileChanges(
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: number
  ): Promise<DashboardPage> {
    await expect(this.profileNameInput).toHaveText(`Jméno: ${name}`);
    await expect(this.profileSurnameInput).toHaveText(`Příjmení: ${surname}`);
    await expect(this.profileEmailInput).toHaveText(`Email: ${email}`);
    await expect(this.profilePhoneInput).toHaveText(`Telefon: ${phone}`);
    await expect(this.profileAgeInput).toHaveText(`Věk: ${age}`);
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await expect(this.logoutButton).toBeVisible();
    await expect(this.logoutButton).toHaveText("Odhlásit se");
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
