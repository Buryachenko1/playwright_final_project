import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/tegb/login_page";
import { RegistrationPage } from "../../src/pages/tegb/registration_page";
import { DashboardPage } from "../../src/pages/tegb/dashboard_page";
import { AccountCreationAPI } from "../../src/api/api_account_creation_object";
import { faker } from "@faker-js/faker";
import {
  expectedBody,
  expectResponseToMatchSchema,
} from "../utils/responseSchema.ts";

test("E2E Registration and Account Creation via FE and API", async ({
  page,
  request,
}) => {
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
  const startBalance = 25000;
  const type = "Test";

  console.log("Used username:", username);
  console.log("Used password:", password);

  // Frontend steps (registration and UI validation)
  await test.step("Register new user via FE", async () => {
    await loginPage
      .openTegB()
      .then((login) => login.clickRegistration())
      .then((register) =>
        register.fillRegistrationForm(username, email, password)
      )
      .then((register) => register.submitRegistrationForm())
      .then((login) => login.verifyRegistrationSuccess());
  });

  // API steps
  await test.step("Login via API and create account", async () => {
    const response = await accountApi.loginAndCreateAccountAPI(
      username,
      password,
      startBalance,
      type
    );
    const body = await response.json();
    console.log("API response body:", body);
    expectResponseToMatchSchema(body, expectedBody(type, startBalance));
  });

  await test.step("Login as Registered User via FE", async () => {
    await loginPage
      .openTegB()
      .then((login) => login.loginWithCredentials(username, password))
      .then((dashboard) => dashboard.verifyDashboardIsVisible());

    await test.step("Edit and verify user profile via FE", async () => {
      await dashboardPage
        .fillAccountProfile(name, surname, email, phone, age)
        // .then((dashboard) => dashboard.verifyUpdateSuccess())
        .then((dashboard) =>
          dashboard.verifyProfileChanges(name, surname, email, phone, age)
        );

      await test.step("Verify User Account Details", async () => {
        await dashboardPage.verifyAccountDetails();

        await test.step("Logout From App", async () => {
          await dashboardPage.clickLogout();
        });
      });
    });
  });
});
