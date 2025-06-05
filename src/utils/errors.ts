/*
  utils/errors.ts
*/
export class TmdbError extends Error {
  constructor(
    message: string,
    public original?: unknown,
  ) {
    super(message);
    this.name = "TmdbError";
    if (original instanceof Error) {
      this.stack = original.stack;
    }
  }
}
