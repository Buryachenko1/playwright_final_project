import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/tegb/login_page.ts";
import { faker } from "@faker-js/faker";
import { RegistrationPage } from "../../src/pages/tegb/registration_page.ts";
import { DashboardPage } from "../../src/pages/tegb/dashboard_page.ts";

test("E2E Registration Test", async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
  const dashboardPage = new DashboardPage(page);
  request;
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  await loginPage
    .openTegB()
    .then((login) => login.clickRegistration())
    .then((register) =>
      register.fillRegistrationForm(username, email, password)
    )
    .then((register) => register.submitRegistrationForm())
    .then((login) => login.verifyRegistrationSuccess())
    .then((login) => login.loginWithCredentials(username, password))
    .then((dashboard) => dashboard.verifyDashboardIsVisible())
    .then((dashboard) => dashboard.clickLogout());
});
