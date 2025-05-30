import { test } from "@playwright/test";
import { AccountCreationAPI } from "../../src/api/api_account_creation_object";
import { faker } from "@faker-js/faker";

test("API login and account creation via steps", async ({ request }) => {
  const username = faker.internet.username();
  const password = faker.internet.password();
  const startBalance = 25000;
  const type = "USD";
  const accountApi = new AccountCreationAPI(request);

  console.log("Used username:", username);
  console.log("Used password:", password);

  let accessToken: string;

  await test.step("Login via API and get access token", async () => {
    accessToken = await accountApi.loginAPI(username, password);
    console.log("Access token obtained:", accessToken);
    // Žádný expect, vše je uvnitř metody!
  });

  await test.step("Create account with access token", async () => {
    await accountApi.createAccountAPI(accessToken, startBalance, type);
  });
});
