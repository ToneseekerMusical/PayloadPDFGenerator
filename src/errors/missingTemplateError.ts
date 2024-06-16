import { APIError } from 'payload/errors'

class MissingTemplateError extends APIError {
  constructor(message: string) {
    super(message, 400, undefined, true)
  }
}

export default MissingTemplateError