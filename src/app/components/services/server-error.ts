import { HttpCodeMessage, HttpResponseError, httpCodeMessages } from "./types/http-response"

export class ServerError extends Error {
  errors: Record<string, string>
  httpCode: keyof typeof httpCodeMessages
  httpCodeMessage: HttpCodeMessage

  constructor(errors: string | Record<string, string>, httpCode: keyof typeof httpCodeMessages = 500) {
    super(httpCodeMessages[httpCode])
    this.errors = typeof errors === 'string' ? { message: errors } : errors
    this.httpCode = httpCode
    this.httpCodeMessage = httpCodeMessages[httpCode]
    Object.setPrototypeOf(this, new.target.prototype);

    console.error(this.errors)

    // fetch(`${process.env.NEXT_PUBLIC_API_V1}/logger`, { 
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     httpCodeMessage: this.httpCodeMessage,
    //     httpCode: this.httpCode,
    //     errors: this.errors
    //   })
    // })
  }

  toResponse = (): HttpResponseError => ({
    errors: this.errors,
    httpCode: this.httpCode
  })
}