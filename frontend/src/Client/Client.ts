import { GetCSRFResponse } from "./Models";

export interface Client {
  getCSRF(): Promise<GetCSRFResponse>;
}

export class BackendClient implements Client {
  async getCSRF(): Promise<GetCSRFResponse> {
    const response = await fetch("/api/v1/csrf", {
      credentials: "same-origin",
    });
    const { detail } = await response.json();

    if (response.ok) {
      return {
        detail,
        csrfToken: response.headers.get("X-CSRFToken") || "",
      };
    }
    return Promise.reject("CSRF request failed");
  }
}
