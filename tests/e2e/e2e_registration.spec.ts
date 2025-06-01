import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/tegb/login_page";
import { RegistrationPage } from "../../src/pages/tegb/registration_page";
import { DashboardPage } from "../../src/pages/tegb/dashboard_page";
import { AccountCreationAPI } from "../../src/api/api_account_flow";
import { faker } from "@faker-js/faker";
import {
  expectedBody,
  expectResponseToMatchSchema,
} from "../utils/responseSchema.ts";

test("E2E User Setup", async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
  const dashboardPage = new DashboardPage(page);
  const accountApi = new AccountCreationAPI(request);

  const username = faker.internet.username();
  const name = faker.person.firstName();
  const surname = faker.person.lastName();
  const email = faker.internet.email();
  const phone = faker.phone.number();
  const age = faker.number.int({ min: 18, max: 65 });
  const password = faker.internet.password();
  const startBalance = faker.number.int({ min: 1, max: 10000000 });
  const type = "Test";

  await test.step("Register user", async () => {
    await loginPage
      .openTegB()
      .then((login) => login.clickRegistration())
      .then((register) =>
        register.fillRegistrationForm(username, email, password)
      )
      .then((register) => register.submitRegistrationForm())
      .then((login) => login.verifyRegistrationSuccess());
  });

  await test.step("Login user", async () => {
    await loginPage
      .openTegB()
      .then((login) => login.loginWithCredentials(username, password))
      .then((dashboard) => dashboard.verifyDashboardIsVisible());
  });

  await test.step("Update profile", async () => {
    await dashboardPage
      .fillAccountProfile(name, surname, email, phone, age)
      .then((dashboard) =>
        dashboard.verifyProfileChanges(name, surname, email, phone, age)
      );
  });

  await test.step("Create account (API)", async () => {
    const response = await accountApi.loginAndCreateAccountAPI(
      username,
      password,
      startBalance,
      type
    );
    const body = await response.json();
    expectResponseToMatchSchema(body, expectedBody(type, startBalance));
  });

  await test.step("Check account details", async () => {
    await dashboardPage.verifyAccountDetails();
  });

  await test.step("Logout", async () => {
    await dashboardPage.clickLogout();
  });
});
