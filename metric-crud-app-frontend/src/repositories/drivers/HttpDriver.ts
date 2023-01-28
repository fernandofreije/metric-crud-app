
export interface HttpDriver {
  post<T, R = T>(url: string, options?: { body: T}): Promise<R>;
  get<R>(url: string): Promise<R>;
}
