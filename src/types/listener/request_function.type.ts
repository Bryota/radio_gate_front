export type RequestFunctionType = {
    id: number
    name: string
    detail?: string
    point: number
    is_voted: boolean
}

export type RequestFunctionsResponseType = {
    request_functions: RequestFunctionType[]
    isLoading: boolean
}

export type RequestFunctionResponseType = {
    request_function: RequestFunctionType
    isLoading: boolean
}
