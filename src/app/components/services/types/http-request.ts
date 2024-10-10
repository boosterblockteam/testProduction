import { HttpResponse } from "./http-response";

export interface Headers {
  Authorization?: string
  Accept?: string
  'Content-Type'?: string
}

export interface HttpRequestOptions {
  body?: Record<string, unknown> | FormData;
  headers?: Headers;
  params?: Record<string, string | number>;
}

export interface HttpRequest {
  get<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  post<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  postFile<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  patch<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  put<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
  delete<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>;
}
