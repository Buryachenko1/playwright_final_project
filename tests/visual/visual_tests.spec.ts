import { test, expect } from "@playwright/test";
import { DashboardPage } from "../../src/pages/tegb/dashboard_page";
import { LoginPage } from "../../src/pages/tegb/login_page";

test.describe("Visual Tests", () => {
  const TEGB_USERNAME = process.env.TEGB_USERNAME as string;
  const TEGB_PASSWORD = process.env.TEGB_PASSWORD as string;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openTegB();
    await loginPage.loginWithCredentials(TEGB_USERNAME, TEGB_PASSWORD);
  });

  test("Verify Dashboard Profile Details", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await expect(dashboardPage.accountSummary).toBeVisible();

    const elementScreenshot = await dashboardPage.accountSummary.screenshot();
    expect(elementScreenshot).toMatchSnapshot("account-summary.png");
  });
});
