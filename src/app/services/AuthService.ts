import fetchInstance from "src/lib/fetchInstance";

export const signIn = async (body: { email: string; password: string }) => {
  return await fetchInstance.post("/api/auth/login", body);
};

export const signUp = async (body: {
  email: string;
  password: string;
  nickName: string;
  name: string;
}) => {
  return await fetchInstance.post("/api/auth/register", body);
};
