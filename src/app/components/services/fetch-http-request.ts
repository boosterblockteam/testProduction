import { ServerError } from "./server-error";
import { HttpRequest, HttpRequestOptions } from "./types/http-request";
import { HttpResponse, getHttpValidCode } from "./types/http-response";

export class FetchHttpRequest implements HttpRequest {
  
  async get<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    try {
      // const requestInit: RequestInit = {};
      // requestInit.headers = this.setHeaders(options);
      url = options?.params ? `${url}?${this.setParams(options)}` : url;
      // requestInit.method = 'GET';
      const response = await fetch(url, {
        headers: this.setHeaders(options),
        cache: 'no-cache'
      })
      
      return await this.generateResponse(response)
    } catch (error) {
      throw this.generateError(error)
    }
  }

  async post<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    try {
      url = options?.params ? `${url}?${this.setParams(options)}` : url;
      const response = await fetch(url, {
        headers: this.setHeaders(options),
        method: 'POST',
        body: options?.body instanceof FormData ? options.body : JSON.stringify(options?.body),
        cache: 'no-cache'
      })

      return await this.generateResponse(response)
    } catch (error) {
      throw this.generateError(error)
    }
  }

  async postFile<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    try {
      url = options?.params ? `${url}?${this.setParams(options)}` : url;
      const response = await fetch(url, {
        method: 'POST',
        body: options?.body instanceof FormData ? options.body : JSON.stringify(options?.body),
      })

      return await this.generateResponse(response)
    } catch (error) {
      throw this.generateError(error)
    }
  }

  async patch<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    try {
      const requestInit: RequestInit = {};
      requestInit.headers = this.setHeaders(options);
      url = options?.params ? `${url}?${this.setParams(options)}` : url;
      requestInit.method = 'PATCH';
      requestInit.body = JSON.stringify(options?.body);
      const response = await fetch(url, requestInit)
      
      return await this.generateResponse(response)
    } catch (error) {
      throw this.generateError(error)
    }
  }

  async put<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    try {
      const requestInit: RequestInit = {};
      requestInit.headers = this.setHeaders(options);
      url = options?.params ? `${url}?${this.setParams(options)}` : url;
      requestInit.method = 'PUT';
      requestInit.body = JSON.stringify(options?.body);
      const response = await fetch(url, requestInit)
      
      return await this.generateResponse(response)
    } catch (error) {
      throw this.generateError(error)
    }
  }

  async delete<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    try {
      const requestInit: RequestInit = {};
      requestInit.headers = this.setHeaders(options);
      url = options?.params ? `${url}?${this.setParams(options)}` : url;
      requestInit.method = 'DELETE';
      const response = await fetch(url, requestInit)
      
      return await this.generateResponse(response)
    } catch (error) {
      throw this.generateError(error)
    }
  }
  
  private setHeaders(options?: HttpRequestOptions): HeadersInit {
    const headers = new Headers();

    if (options?.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.append(key, value);
      });
    }
    
    if (!headers.has('Content-Type')) {
      headers.append('Content-Type', 'application/json');
    }

    return headers;
  }

  private setParams(options?: HttpRequestOptions): URLSearchParams | undefined {
    if (options?.params) {
      const params = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        params.append(key, `${value}`);
      });
      return params;
    }
  }

  private generateError(error: unknown): ServerError {
    if (error instanceof ServerError) {
      if (error.toResponse().errors?.message?.includes('DOCTYPE')) {
        return new ServerError('Page not found', 404)
      }
      return error
    }

    if (error instanceof Error) {
      return new ServerError(error.message, 500)
    }
    
    return new ServerError('Unknown error', 500)
  }

  private async generateResponse(response: Response): Promise<HttpResponse<any>> {
    try {
      const data = await response.json();
      
      if (response.ok) {
        return {
          data,
          httpCode: getHttpValidCode(response.status)
        }
      } else {
        console.log("data")
        console.log(data)
        if (data.errors) {
          throw new ServerError(data.errors, getHttpValidCode(response.status))
          // throw new Error(data.errors)
        }
        
        if (response.status) {
          throw new ServerError(response.statusText, getHttpValidCode(response.status))
          // throw new Error(response.statusText)
        }

        throw new ServerError('Unknown error', getHttpValidCode(response.status))
        // throw new Error('Unknown error')
      }
    } catch (error) {
      throw this.generateError(error)
    }
  }
}