export abstract class Usecase<T = void> {
  abstract execute(...args: any[]): T;
}
