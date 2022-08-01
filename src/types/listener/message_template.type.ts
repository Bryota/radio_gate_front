export type MessageTemplateType = {
    id?: number
    name?: string
    content?: string
}

export type MessageTemplatesResponseType = {
    data: MessageTemplateType[]
    isLoading: boolean
    last_page: number
}

export type MessageTemplateResponseType = {
    id?: number
    name?: string
    content?: string
    isLoading: boolean
}
