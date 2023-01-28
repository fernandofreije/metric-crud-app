import nock from 'nock';

interface BuildOptions {
  url: string;
}

export class HttpMockFactory {
  public static build({ url }: BuildOptions): nock.Scope {
    return nock(url, {
      reqheaders: {
        "Content-Type": 'application/json',
      },
    });
  }
}
