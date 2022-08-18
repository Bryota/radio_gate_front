export type validatedArrayType = {
    key: string,
    message: string
}

export type UrlParamsType = {
    id: string
}

export type FormInputType = {
    myProgeamConrerId: number
    key: string,
    value?: string,
    text: string,
    type?: string
    isFirstItem?: boolean
    validationMessages?: Array<validatedArrayType>
    data_testid?: string
    changeAction?: (event: React.ChangeEvent<HTMLInputElement>) => void
    deleteAction?: (id: number) => void
    deleteFormAction?: (id: number) => void
}

export type SelectItemType = {
    id?: number
    name?: string
    content?: string
    created_at?: string
    updated_at?: string
}

export type ApiResponseType = {
    data: {},
    status: number | undefined
}
