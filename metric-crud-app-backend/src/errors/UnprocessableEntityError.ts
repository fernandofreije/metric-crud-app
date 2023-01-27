export class UnprocessableEntityError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'UnprocessableEntityError'
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype)
  }
}
