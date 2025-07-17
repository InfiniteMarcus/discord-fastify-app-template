export default class Log {
  static info(message: string): void {
    console.log(message);
  }

  static error(message: unknown): void {
    console.error(message);
  }
}
