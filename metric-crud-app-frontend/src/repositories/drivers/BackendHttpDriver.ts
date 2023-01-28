import { HttpDriver } from "./HttpDriver";

export class BackendHttpDriver implements HttpDriver {
    constructor() {}
  
    public async post<T, R = T>(url: string, options?: { body: T; }): Promise<R> {
      const response = await fetch(process.env.BACKEND_URL + url, {
        method: 'post',
        ...(options && { body: JSON.stringify(options.body) }),
        headers: {
          "Content-Type": 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error(`ERROR: request failed with status: ${response.status}`);
      }
  
      if (response.status === 204 || response.status === 202) {
        return {} as R;
      }
  
      return await response.json();
    }
  
  
    public async get<R>(url: string): Promise<R> {
      const response = await fetch(process.env.BACKEND_URL + url, {
        method: 'get',
        headers: {
            "Content-Type": 'application/json',
          }
      });
  
      if (!response.ok) {
        throw new Error(`ERROR: request failed with status: ${response.status}`);
      }
  
      return await response.json();
    }
  
  }
  