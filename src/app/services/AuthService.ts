export const signIn = async (body: { email: string; password: string }) => {
  const res = await fetch("http://13.209.210.123:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "로그인 실패");
  }

  return res.json();
};
