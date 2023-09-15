export interface ApiResponse<T> {
  data?: T[];
  message?: string;
  statusCode?: number;
  success?: boolean;
  access_token?: string;
}
