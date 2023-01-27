
interface UseCaseError {
  code: number
  message: string
}

export interface UseCaseResponse<T = any> {
  data?: T
  error?: UseCaseError
}

export interface UseCase<Options = object> {
  perform: (options: Options) => Promise<UseCaseResponse>
}
