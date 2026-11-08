export class InternalError extends Error {
  errors: Record<string, string[]>;
  constructor(errors: Record<string, string[]>) {
    super();
    this.errors = errors;
  }
}

export class ValidationError extends Error {
  errors: Record<string, string[]>;
  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.errors = errors;
  }
}
