export type ApiResponse<Response> = {
  response?: Response;
  message?: string;
  statusCode?: number;
  success?: boolean;
};
