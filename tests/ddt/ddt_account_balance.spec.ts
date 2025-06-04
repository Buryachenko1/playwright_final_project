import { test } from "@playwright/test";
import { AccountCreationAPI } from "../../src/api/api_flow.ts";
import ddtData from "../../src/assets/ddt/ddt_data.json";
import {
  expectedBody,
  expectResponseToMatchSchema,
} from "../utils/responseSchema.ts";
import { faker } from "@faker-js/faker";

test.describe("DDT Account Creation", () => {
  let username: string;
  let password: string;
  let email: string;
  let accountApi: AccountCreationAPI;

  test.beforeEach(async ({ request }) => {
    username = faker.internet.username();
    password = faker.internet.password();
    email = faker.internet.email();
    accountApi = new AccountCreationAPI(request);
  });

  ddtData.forEach((data, index) => {
    const newType = `test ${index + 1}`;

    test(`Create Account With startBalance: ${data.startBalance} and type: ${newType}`, async () => {
      await accountApi.registerUser(username, password, email);

      const response = await accountApi.loginAndCreateAccountAPI(
        username,
        password,
        data.startBalance,
        newType
      );
      const body = await response.json();

      expectResponseToMatchSchema(
        body,
        expectedBody(newType, data.startBalance)
      );
      console.log(
        `Account created with startBalance: ${data.startBalance} and type: ${newType} for user: ${username}`
      );
    });
  });
});
