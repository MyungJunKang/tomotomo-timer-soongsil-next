// lib/fetcher.ts

export interface FetcherOptions {
  method?: string;
  headers?: HeadersInit;
  body?: unknown;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrerPolicy?: ReferrerPolicy;
  integrity?: string;
  keepalive?: boolean;
  signal?: AbortSignal | null;
}

export async function fetcher<T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T> {
  const { body, headers, method = "GET", ...rest } = options;

  const composedHeaders = new Headers({
    "Content-Type": "application/json",
    ...headers,
  });

  const fetchOptions: RequestInit = {
    ...rest,
    method,
    headers: composedHeaders,
    body: body ? JSON.stringify(body) : undefined,
  };

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    let errorMessage = `Request failed with status ${res.status}`;

    try {
      const errorData = await res.json();
      if (
        typeof errorData === "object" &&
        errorData !== null &&
        "message" in errorData
      ) {
        errorMessage = errorData.message;
      }
    } catch {
      // ignore JSON parsing errors
    }

    throw new Error(errorMessage);
  }

  const data: unknown = await res.json();
  return data as T;
}
