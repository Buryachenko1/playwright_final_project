import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/tegb/login_page";
import { ProfileDetailSection } from "../../src/pages/tegb/dashboard-sections/profileDetailSection.ts";

test.describe("@visual TegB Visual Tests", () => {
  const TEGB_USERNAME = process.env.TEGB_USERNAME as string;
  const TEGB_PASSWORD = process.env.TEGB_PASSWORD as string;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openTegB();
    await loginPage.loginWithCredentials(TEGB_USERNAME, TEGB_PASSWORD);
  });

  test("Verify Dashboard Profile Details", async ({ page }) => {
    const profileDetail = new ProfileDetailSection(page);
    await profileDetail.profileDetailVisualCheck;
  });
});
