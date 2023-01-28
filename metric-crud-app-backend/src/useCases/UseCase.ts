
interface UseCaseError {
  code: number
  message: string
}

export interface UseCaseResponse<T = any> {
  data?: T
  error?: UseCaseError
}

export interface UseCase<T = any> {
  perform: (options: any) => Promise<UseCaseResponse<T>>
}
