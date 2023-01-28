import { HttpDriver } from './HttpDriver';

export class FakeHttpDriver implements HttpDriver {
  public post = jest.fn();
  public get = jest.fn();
  public delete = jest.fn();
  public patch = jest.fn();
}
