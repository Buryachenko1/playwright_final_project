import { expect, type Locator, type Page } from "@playwright/test";
import { tegbTexts } from "../../../assets/dictionaries/dictionary.ts";
import { DashboardPage } from "../dashboard_page.ts";

export class ProfileDetailSection {
  private readonly page: Page;
  readonly accountSummary: Locator;
  readonly profileHeader: Locator;
  readonly profileNameInput: Locator;
  readonly profileSurnameInput: Locator;
  readonly profileEmailInput: Locator;
  readonly profilePhoneInput: Locator;
  readonly profileAgeInput: Locator;
  readonly profileUpdateMessage: Locator;
  private readonly changeNameInput: Locator;
  private readonly changeSurnameInput: Locator;
  private readonly changeEmailInput: Locator;
  private readonly changePhoneInput: Locator;
  private readonly changeAgeInput: Locator;
  readonly editAccountButton: Locator;
  private readonly saveChangesButton: Locator;

  constructor(page: Page) {
    this.page = page;
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
  }

  async verifyProfileDetails(): Promise<ProfileDetailSection> {
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
  async clickEditAccount(): Promise<ProfileDetailSection> {
    await expect(this.editAccountButton).toBeVisible();
    await expect
      .soft(this.editAccountButton)
      .toHaveText(tegbTexts.profile.editButton);
    await this.editAccountButton.click();
    return this;
  }

  async fillProfileName(name: string): Promise<ProfileDetailSection> {
    await expect(this.changeNameInput).toBeVisible();
    await this.changeNameInput.pressSequentially(name);
    await expect(this.changeNameInput).toHaveValue(name);
    return this;
  }

  async fillProfileSurname(surname: string): Promise<ProfileDetailSection> {
    await expect.soft(this.changeSurnameInput).toBeVisible();
    await this.changeSurnameInput.fill(surname);
    await expect.soft(this.changeSurnameInput).toHaveValue(surname);
    return this;
  }

  async fillProfileEmail(email: string): Promise<ProfileDetailSection> {
    await expect.soft(this.changeEmailInput).toBeVisible();
    await this.changeEmailInput.pressSequentially(email);
    await expect.soft(this.changeEmailInput).toHaveValue(email);
    return this;
  }

  async fillProfilePhone(phone: string): Promise<ProfileDetailSection> {
    await expect.soft(this.changePhoneInput).toBeVisible();
    await this.changePhoneInput.pressSequentially(phone);
    await expect.soft(this.changePhoneInput).toHaveValue(phone);
    return this;
  }

  async fillProfileAge(age: string): Promise<ProfileDetailSection> {
    await expect.soft(this.changeAgeInput).toBeVisible();
    await this.changeAgeInput.pressSequentially(age);
    await expect.soft(this.changeAgeInput).toHaveValue(age);
    return this;
  }

  async submitProfileChanges(): Promise<ProfileDetailSection> {
    await expect.soft(this.saveChangesButton).toBeVisible();
    await expect.soft(this.saveChangesButton).toHaveText("Uložit změny");
    await this.saveChangesButton.click();
    return this;
  }

  async fillAccountProfile(
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: number
  ): Promise<ProfileDetailSection> {
    await this.clickEditAccount();
    await this.fillProfileName(name);
    await this.fillProfileSurname(surname);
    await this.fillProfileEmail(email);
    await this.fillProfilePhone(phone);
    await this.fillProfileAge(`${age}`);
    await this.submitProfileChanges();
    return this;
  }

  async verifyUpdateSuccess(): Promise<ProfileDetailSection> {
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
  ): Promise<ProfileDetailSection> {
    await expect(this.accountSummary).toBeVisible();
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

  async profileDetailVisualCheck(
    screen: string
  ): Promise<ProfileDetailSection> {
    await expect(this.accountSummary).toBeVisible();
    await expect(this.accountSummary).toHaveScreenshot(`${screen}.png`);

    return this;
  }
}
