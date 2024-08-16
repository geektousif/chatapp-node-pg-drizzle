export interface ApiResponse<T> {
  success: boolean;
  // error?: string;
  message?: string | Array<string>;
  data?: T;
}

export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function errorResponse<T>(
  message?: string | Array<string>
): ApiResponse<T> {
  return {
    success: false,
    message,
  };
}
