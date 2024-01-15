export class EmptyResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmptyResponseError";
  }
}

export class PrismaCustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PrismaCustomError";
  }
}
