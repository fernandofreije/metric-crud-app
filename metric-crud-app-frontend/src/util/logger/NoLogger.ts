import { Logger } from './Logger';

export class NoLogger implements Logger {
  public error = jest.fn();
}
