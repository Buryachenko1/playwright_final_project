import { test } from "@playwright/test";
import { AccountCreationAPI } from "../../src/api/api_account_creation_object";
import { faker } from "@faker-js/faker";

let accountApi: AccountCreationAPI;
let username: string;
let password: string;
let startBalance: number;
const type = "Test";

test.beforeEach(async ({ request }) => {
  accountApi = new AccountCreationAPI(request);
  username = faker.internet.username(); // POZOR! správně userName(), ne username()
  password = faker.internet.password();
  startBalance = faker.number.float({
    min: 1,
    max: 100000000,
  });
});

test("API Login and Get Access Token", async () => {
  const accessToken = await accountApi.loginAPI(username, password);
});

test("API Create Account", async () => {
  const accessToken = await accountApi.loginAPI(username, password);
  await accountApi.createAccountAPI(accessToken, startBalance, type);
});
