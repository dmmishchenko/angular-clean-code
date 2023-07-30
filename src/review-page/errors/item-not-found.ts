export class ItemNotFoundError extends Error {
  constructor(override readonly message: string) {
    super(message);
    this.name = "ItemNotFoundError";
  }
}