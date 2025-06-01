export function expectedBody(type: string, startBalance: number) {
  return {
    userId: (val: any) => typeof val === "number",
    accountNumber: (val: any) => typeof val === "string" && /^\d{7}$/.test(val),
    accountType: (val: any) => val === type,
    balance: (val: any) => typeof val === "number" && val === startBalance,
    status: (val: any) => val === "Active",
    accountId: (val: any) => typeof val === "number",
    createdDate: (val: any) =>
      typeof val === "string" &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(val),
  };
}
export function expectResponseToMatchSchema(
  responseBody: any,
  schema: Record<string, (val: any) => boolean>
) {
  for (const [key, validator] of Object.entries(schema)) {
    if (!validator(responseBody[key])) {
      throw new Error(`Response body does not match schema for key: ${key}`);
    }
  }
}
