import authInstance from "src/lib/authInstance";

export const signIn = async (body: { email: string; password: string }) => {
  return await authInstance.post("/api/auth/login", body);
};

export const signUp = async (body: {
  email: string;
  password: string;
  nickName: string;
  name: string;
}) => {
  return await authInstance.post("/api/auth/register", body);
};

export const reissueToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return await authInstance.post("/api/auth/refresh", {
    refreshToken,
  });
};
