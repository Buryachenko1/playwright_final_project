import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { baseUrl } from "../config.ts";

export class AccountCreationAPI {
  private readonly request: APIRequestContext;
  private readonly registerUrl: string;
  private readonly loginUrl: string;
  private readonly createAccountUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.registerUrl = `${baseUrl}/tegb/register`;
    this.loginUrl = `${baseUrl}/tegb/login`;
    this.createAccountUrl = `${baseUrl}/tegb/accounts/create`;
  }

  async registerUser(
    username: string,
    password: string,
    email: string
  ): Promise<APIResponse> {
    const response = await this.request.post(this.registerUrl, {
      data: {
        username,
        password,
        email,
      },
    });
    console.log(`User registered: ${username}, ${email}`);
    expect(response.status()).toBe(201);
    return response;
  }

  async loginUser(username: string, password: string): Promise<APIResponse> {
    const response = await this.request.post(this.loginUrl, {
      data: { username, password },
    });
    expect(response.status()).toBe(201);
    return response;
  }

  async loginAndGetAccessToken(
    username: string,
    password: string
  ): Promise<string> {
    const response = await this.loginUser(username, password);
    const body = await response.json();
    const accessToken = body.access_token;
    expect(accessToken).toBeDefined();
    return accessToken;
  }

  async createAccountAPI(
    accessToken: string,
    startBalance: number,
    type: string
  ): Promise<APIResponse> {
    const response = await this.request.post(this.createAccountUrl, {
      data: { startBalance, type },
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
    const accessToken = await this.loginAndGetAccessToken(username, password);
    return this.createAccountAPI(accessToken, startBalance, type);
  }
}
