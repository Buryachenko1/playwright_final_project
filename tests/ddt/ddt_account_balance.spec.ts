import { test, expect, request as playwrightRequest } from "@playwright/test";
import { AccountCreationAPI } from "../api/api_account_flow.spec.ts";
import ddtData from "../../src/assets/ddt_data.json";

test.describe("Account creation DDT - forEach style", () => {
  let accountApi: AccountCreationAPI;
  let apiRequest: any;

  const username = "testuser";
  const password = "testpassword";

  test.beforeAll(async ({ playwright }) => {
    apiRequest = await playwrightRequest.newContext();
    accountApi = new AccountCreationAPI(apiRequest);
  });

  ddtData.forEach((data, index) => {
    const newType = `test ${index + 1}`;

    test("Data Driven Account Creation", async () => {
      const response = await accountApi.loginAndCreateAccountAPI(
        username,
        password,
        data.startBalance,
        newType
      );
      const body = await response.json();

      expect(body).toHaveProperty("id");
      expect(body.startBalance).toBe(data.startBalance);
      expect(body.type).toBe(newType);
    });
  });

  test.afterAll(async () => {
    await apiRequest.dispose();
  });
});
