import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/tegb/registration_page";

export class AccountCreationAPI {
  private readonly request: APIRequestContext;
  private readonly registerUrl =
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts/create";
  private readonly loginUrl =
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async loginAPI(username: string, password: string): Promise<string> {
    const response = await this.request.post(this.loginUrl, {
      data: {
        username,
        password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    const accessToken = body.access_token;
    return body.access_token;
  }

  async createAccountAPI(
    accessToken: string,
    startBalance: number,
    type: string
  ): Promise<APIResponse> {
    const response = await this.request.post(this.registerUrl, {
      data: {
        startBalance,
        type,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status()).toBe(201);
    return response;
  }

  async loginAndCreateAccountAPI(
    username: string,
    password: string,
    startBalance: number,
    type: string
  ): Promise<APIResponse> {
    await this.loginAPI(username, password);
    return this.createAccountAPI(startBalance, type);
  }
}
