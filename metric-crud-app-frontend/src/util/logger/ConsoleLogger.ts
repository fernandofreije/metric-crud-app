import { Logger } from './Logger';

export class ConsoleLogger implements Logger {
  public error = console.error;
}
