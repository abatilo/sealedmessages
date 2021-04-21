export type GetCSRFResponse = {
  detail: string;
  csrfToken: string;
};

export type GetSessionResponse = {
  isAuthenticated: boolean;
};
