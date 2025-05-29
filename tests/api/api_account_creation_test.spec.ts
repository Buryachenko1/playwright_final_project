import { test, expect, request } from "@playwright/test";
import { AccountCreationAPI } from "../../src/api/api_account_creation_object.ts";
import { faker } from "@faker-js/faker";
import {
  expectResponseToMatchSchema,
  expectedBody,
} from "../utils/responseSchema.ts";

test("API Account Creation", async ({ request }) => {
  const username = faker.internet.userName();
  console.log(username);
  const password = faker.internet.password();
  console.log(password);
  const startBalance = 25000;
  const type = "USD";
  const accountApi = new AccountCreationAPI(request);

  const response = await accountApi.loginAndCreateAccountAPI(
    username,
    password,
    startBalance,
    type
  );

  expect(response.status()).toBe(201);
  const body = await response.json();
  expectResponseToMatchSchema(body, expectedBody);
});
