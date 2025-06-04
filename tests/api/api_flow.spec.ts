import { test } from "@playwright/test";
import { AccountCreationAPI } from "../../src/api/api_flow";
import { faker } from "@faker-js/faker";

let accountApi: AccountCreationAPI;
let username: string;
let password: string;
let email: string;
let startBalance: number;
const type = "Test";

test.beforeEach(async ({ request }) => {
  accountApi = new AccountCreationAPI(request);
  username = faker.internet.username();
  password = faker.internet.password();
  email = faker.internet.email();
  startBalance = faker.number.int({
    min: 1,
    max: 100000000,
  });
});

test("API E2E: Register, Login, Create Account", async () => {
  let accessToken: string;

  await test.step("Create account (register user)", async () => {
    await accountApi.registerUser(username, password, email);
  });

  await test.step("Login and get access token", async () => {
    accessToken = await accountApi.loginUser(username, password);
  });

  await test.step("Create Account via API", async () => {
    await accountApi.createAccountAPI(accessToken, startBalance, type);
  });
});
