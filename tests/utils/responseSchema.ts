import { expect } from "@playwright/test";
export function expectResponseToMatchSchema(actual: any, schema: any) {
  for (const [key, validator] of Object.entries(schema)) {
    expect(actual).toHaveProperty(key);
    expect((validator as (val: any) => boolean)(actual[key])).toBeTruthy();
  }
}

export function expectedBody(type: string, startBalance: number) {
  return {
    userId: (val: any) => typeof val === "number",
    accountNumber: (val: any) => /^\d{7}$/.test(val),
    accountType: (val: any) => val === type,
    balance: (val: any) => val === startBalance,
    status: (val: any) => val === "Active",
    accountId: (val: any) => typeof val === "number",
    createdDate: (val: any) =>
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(val),
  };
}
