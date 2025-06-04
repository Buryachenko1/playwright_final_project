import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { baseUrl } from "../config.ts";

export class AccountCreationAPI {
  private readonly request: APIRequestContext;
  private readonly baseUrl = baseUrl;
  private readonly registerUrl = `${this.baseUrl}/tegb/accounts/create`;
  private readonly loginUrl = `${this.baseUrl}/tegb/login`;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerUser(
    username: string,
    password: string,
    email: string
  ): Promise<APIResponse> {
    const response = await this.request.post(`${this.registerUrl}`, {
      data: {
        username,
        password,
        email,
      },
    });
    expect(response.status()).toBe(201);
    return response;
  }

  async loginUser(username: string, password: string): Promise<string> {
    const response = await this.request.post(this.loginUrl, {
      data: { username, password },
      headers: { "Content-Type": "application/json" },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty("access_token");
    expect(body.access_token).toBeDefined();
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
    const accessToken = await this.loginUser(username, password);
    return this.createAccountAPI(accessToken, startBalance, type);
  }
}
