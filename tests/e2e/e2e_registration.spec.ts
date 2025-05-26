import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/tegb/login_page.ts";
import { faker } from "@faker-js/faker";
import { RegistrationPage } from "../../src/pages/tegb/registration_page.ts";
import { DashboardPage } from "../../src/pages/tegb/dashboard_page.ts";
import { AccountCreationAPI } from "./e2e_api_account_creation.spec.ts";

test("E2E Registration Test", async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
  const dashboardPage = new DashboardPage(page);
  const accountApi = new AccountCreationAPI(request);
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  await loginPage.openTegB();
  await accountApi.loginAndCreateAccountAPI(username, password, 25000, "USD");
  await loginPage.clickRegistration();
  await registrationPage.fillRegistrationForm(username, email, password);
  await registrationPage.submitRegistrationForm();
  await registrationPage.verifyRegistrationSuccess();
  await loginPage.loginWithCredentials(email, password);
  await dashboardPage.verifyDashboardIsVisible();
  await dashboardPage.clickLogout();
});
