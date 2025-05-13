export const decodeJWT = <T = unknown>(token: string): T | null => {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64").toString("utf8");
  return JSON.parse(payload);
};
