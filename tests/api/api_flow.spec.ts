import { test, expect } from "@playwright/test";
import { AccountCreationAPI } from "../../src/api/api_flow";
import { faker } from "@faker-js/faker";

test.describe("@api Login User API", () => {
  let username: string;
  let password: string;
  let email: string;

  test.beforeEach(async ({ request }) => {
    username = faker.internet.username();
    password = faker.internet.password();
    email = faker.internet.exampleEmail();
    const accountApi = new AccountCreationAPI(request);
    await accountApi.registerUser(username, password, email);
  });

  test("Login User Test", async ({ request }) => {
    const accountApi = new AccountCreationAPI(request);
    const response = await accountApi.loginUser(username, password);
    const body = await response.json();

    expect(body.access_token).toBeDefined();
  });
});
