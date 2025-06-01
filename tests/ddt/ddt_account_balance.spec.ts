import { test } from "@playwright/test";
import { AccountCreationAPI } from "../../src/api/api_account_flow";
import ddtData from "../../src/assets/ddt/ddt_data.json";
import {
  expectedBody,
  expectResponseToMatchSchema,
} from "../utils/responseSchema.ts";

test.describe("DDT Account Creation", () => {
  let accessToken: string;

  const username = "evbu";
  const password = "Heslo.123";

  test.beforeAll(async ({ request }) => {
    const accountApi = new AccountCreationAPI(request);
    accessToken = await accountApi.loginAPI(username, password);
  });

  ddtData.forEach((data, index) => {
    const newType = `test ${index + 1}`;
    test(`Create Account With startBalance: ${data.startBalance} and type: ${newType}`, async ({
      request,
    }) => {
      const accountApi = new AccountCreationAPI(request);

      const response = await accountApi.createAccountAPI(
        accessToken,
        data.startBalance,
        newType
      );
      const body = await response.json();
      expectResponseToMatchSchema(
        body,
        expectedBody(newType, data.startBalance)
      );
      console.log(
        `Account created with startBalance: ${data.startBalance} and type: ${newType}`
      );
    });
  });
});
