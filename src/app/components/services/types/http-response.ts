/**
 * Estos códigos http son los códigos estándares para las respuestas HTTP
 */

import { Headers } from "./http-request"

export const httpCodeMessages = {
  100: 'Continue',
  101: 'Switching Protocol',
  102: 'Processing',
  103: 'Early Hints',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  208: 'Multi-Status',
  226: 'IM Used',
  300: 'Multiple Choice',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy Obsoleto',
  306: 'unused',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot',
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required'
} as const

export const getHttpCodeMessage = (code: number) => {
  if (httpCodeMessages.hasOwnProperty(code)) {
    return httpCodeMessages[code as keyof typeof httpCodeMessages]
  } else {
    return httpCodeMessages[500]
  }
}

export type HttpCodeMessage = (typeof httpCodeMessages)[keyof typeof httpCodeMessages]

export const getHttpValidCode = (code: number | null | undefined): keyof typeof httpCodeMessages => {
  if (code === null || code === undefined) {
    return 500
  }

  if (httpCodeMessages.hasOwnProperty(code)) {
    return code as keyof typeof httpCodeMessages
  }

  return 500

}

/**
 * Esta interfaz contiene los valores que una request puede devolver
 */

export interface HttpResponse<T> {
  httpCode: keyof typeof httpCodeMessages
  data: T
  headers?: Headers
}

export interface HttpResponseError {
  httpCode: keyof typeof httpCodeMessages
  errors: Record<string, string>
  headers?: Headers
}
