export type RequestFunctionType = {
    id: number
    name: string
    detail?: string
    point: number
    is_voted: boolean
}

export type RequestFunctionsResponseType = {
    data: RequestFunctionType[]
    isLoading: boolean
}

export type RequestFunctionResponseType = {
    id: number
    name: string
    detail?: string
    point: number
    is_voted: boolean
    isLoading: boolean
}
