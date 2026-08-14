import { expect, test } from "@playwright/test";
import { LoginPage } from "../../src/pages/tegb/login_page";
import { DashboardPage } from "../../src/pages/tegb/dashboard_page";
import { tegbTexts } from "../../src/assets/dictionaries/dictionary";

const TEGB_USERNAME = process.env.TEGB_USERNAME as string;
const TEGB_PASSWORD = process.env.TEGB_PASSWORD as string;

test.describe("TegB Atomic Tests", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.openTegB();
    await loginPage.loginWithCredentials(TEGB_USERNAME, TEGB_PASSWORD);
  });

  test("Verify Dashboard Page", async () => {
    await test.step("Verify Dashboard Is Visible", async () => {
      await dashboardPage.verifyDashboardIsVisible();
    });

    await test.step("@dashboard @header Verify Dashboard Header", async () => {
      await expect.soft(dashboardPage.headerLogo).toBeVisible();
      await expect
        .soft(dashboardPage.headerLogo)
        .toHaveAttribute("src", /logo.png/);
      await expect.soft(dashboardPage.headerTitle).toBeVisible();
      await expect
        .soft(dashboardPage.headerTitle)
        .toHaveText(tegbTexts.general.appHeader);
      await expect.soft(dashboardPage.headerLogoutButton).toBeVisible();
      await expect.soft(dashboardPage.headerLogoutButton).toBeEnabled();
      await expect
        .soft(dashboardPage.headerLogoutButton)
        .toHaveText(tegbTexts.general.logout);
    });

    await test.step("@dashboard @sidebar Verify Dashboard Sidebar", async () => {
      await expect.soft(dashboardPage.sidebar).toBeVisible();
      await expect.soft(dashboardPage.sidebarHomeItem).toBeVisible();
      await expect
        .soft(dashboardPage.sidebarHomeItem)
        .toHaveText(tegbTexts.sidebar.home);
      await expect.soft(dashboardPage.sidebarAccountsItem).toBeVisible();
      await expect
        .soft(dashboardPage.sidebarAccountsItem)
        .toHaveText(tegbTexts.sidebar.accounts);
      await expect.soft(dashboardPage.sidebarTransactionsItem).toBeVisible();
      await expect
        .soft(dashboardPage.sidebarTransactionsItem)
        .toHaveText(tegbTexts.sidebar.transactions);
      await expect.soft(dashboardPage.sidebarSupportItem).toBeVisible();
      await expect
        .soft(dashboardPage.sidebarSupportItem)
        .toHaveText(tegbTexts.sidebar.support);
    });

    await test.step("@dashboard @profile Verify Profile Section", async () => {
      await expect
        .soft(dashboardPage.profileDetail.profileHeader)
        .toBeVisible();
      await expect
        .soft(dashboardPage.profileDetail.profileHeader)
        .toHaveText(tegbTexts.profile.detailsHeader);
      await expect
        .soft(dashboardPage.profileDetail.profileNameInput)
        .toBeVisible();
      await expect
        .soft(dashboardPage.profileDetail.profileNameInput)
        .toContainText(tegbTexts.profile.name);
      await expect
        .soft(dashboardPage.profileDetail.profileSurnameInput)
        .toBeVisible();
      await expect
        .soft(dashboardPage.profileDetail.profileSurnameInput)
        .toContainText(tegbTexts.profile.surname);
      await expect
        .soft(dashboardPage.profileDetail.profileEmailInput)
        .toBeVisible();
      await expect
        .soft(dashboardPage.profileDetail.profileEmailInput)
        .toContainText(tegbTexts.profile.email);
      await expect
        .soft(dashboardPage.profileDetail.profilePhoneInput)
        .toBeVisible();
      await expect
        .soft(dashboardPage.profileDetail.profilePhoneInput)
        .toContainText(tegbTexts.profile.phone);
      await expect
        .soft(dashboardPage.profileDetail.profileAgeInput)
        .toBeVisible();
      await expect
        .soft(dashboardPage.profileDetail.profileAgeInput)
        .toContainText(tegbTexts.profile.age);
      await expect
        .soft(dashboardPage.profileDetail.editAccountButton)
        .toBeVisible();
      await expect
        .soft(dashboardPage.profileDetail.editAccountButton)
        .toContainText(tegbTexts.profile.editButton);
      await expect
        .soft(dashboardPage.profileDetail.editAccountButton)
        .toBeEnabled();
    });

    await test.step("@dashboard @account Verify Account Section", async () => {
      await expect
        .soft(dashboardPage.accountDetail.accountNumberHeading)
        .toBeVisible();
      await expect
        .soft(dashboardPage.accountDetail.accountNumberHeading)
        .toHaveText(tegbTexts.accounts.number);
      await expect
        .soft(dashboardPage.accountDetail.accountNumberValue)
        .toBeVisible();
      await expect
        .soft(dashboardPage.accountDetail.accountBalanceHeading)
        .toBeVisible();
      await expect
        .soft(dashboardPage.accountDetail.accountBalanceHeading)
        .toHaveText(tegbTexts.accounts.balance);
      await expect
        .soft(dashboardPage.accountDetail.accountBalanceValue)
        .toBeVisible();
      await expect
        .soft(dashboardPage.accountDetail.accountTypeHeading)
        .toBeVisible();
      await expect
        .soft(dashboardPage.accountDetail.accountTypeHeading)
        .toHaveText(tegbTexts.accounts.type);
      await expect
        .soft(dashboardPage.accountDetail.accountTypeValue)
        .toBeVisible();
    });

    await test.step("@footer Verify Footer", async () => {
      await expect.soft(dashboardPage.footer).toBeVisible();
      await expect
        .soft(dashboardPage.footerText)
        .toHaveText(tegbTexts.footer.copyright);
    });
  });
});
