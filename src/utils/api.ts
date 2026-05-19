import { NextResponse } from "next/server";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  meta?: any;
}

export function formatSuccessResponse<T>(data: T, message?: string, meta?: any, status = 200) {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };
  
  if (message) response.message = message;
  if (meta) response.meta = meta;

  return NextResponse.json(response, { status });
}

export function formatErrorResponse(error: string | Error | unknown, status = 500, message = "An error occurred") {
  const errorMessage = error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";
  
  console.error(`[API Error] ${status}:`, error);

  return NextResponse.json(
    {
      success: false,
      message,
      error: errorMessage,
    },
    { status }
  );
}
