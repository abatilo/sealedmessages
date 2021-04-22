import { GetCSRFResponse, GetSessionResponse } from "./Models";

export interface Client {
  csrfToken(): string;
  authenticated(): boolean;
  setAuthenticated(authenticated: boolean): void;

  getCSRF(): Promise<GetCSRFResponse>;
  getSession(): Promise<GetSessionResponse>;
  login(username: string, password: string): Promise<void>;
  logout(): void;
}

export class BackendClient implements Client {
  public token: string = "";
  public isAuthenticated: boolean = false;

  public constructor() {
    console.log("Creating new client");
  }

  csrfToken(): string {
    return this.token;
  }

  authenticated(): boolean {
    return this.isAuthenticated;
  }

  setAuthenticated(authenticated: boolean): void {
    this.isAuthenticated = authenticated;
  }

  async getCSRF(): Promise<GetCSRFResponse> {
    const response = await fetch("/api/v1/csrf", {
      credentials: "same-origin",
    });
    const { detail } = await response.json();

    if (response.ok) {
      const csrfToken = response.headers.get("X-CSRFToken") || "";
      this.token = csrfToken;
      return {
        detail,
        csrfToken,
      };
    }
    return Promise.reject("CSRF request failed");
  }

  async getSession(): Promise<GetSessionResponse> {
    const response = await fetch("/api/v1/session", {
      credentials: "same-origin",
    });
    const { isAuthenticated } = await response.json();
    this.isAuthenticated = isAuthenticated;

    if (response.ok) {
      return {
        isAuthenticated,
      };
    }
    return Promise.reject("Session request failed");
  }

  async login(username: string, password: string): Promise<void> {
    const resp = await fetch("/api/v1/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.token,
      },
      body: JSON.stringify({ username, password }),
    });

    console.log("Before resp.ok: " + this.isAuthenticated);
    if (resp.ok) {
      this.isAuthenticated = true;
      return Promise.resolve();
    }
    console.log("After resp.ok: " + this.isAuthenticated);
    return Promise.reject("Failed to login");
  }

  async logout(): Promise<void> {
    const resp = await fetch("/api/v1/logout", {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.token,
      },
    });

    if (resp.ok) {
      this.isAuthenticated = false;
      return Promise.resolve();
    }
    return Promise.reject("Failed to logout");
  }
}