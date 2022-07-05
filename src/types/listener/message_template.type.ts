export type MessageTemplateType = {
    id?: number
    name?: string
    content?: string
}

export type MessageTemplatesResponseType = {
    message_templates: {
        data: MessageTemplateType[]
    }
    isLoading: boolean
}

export type MessageTemplateResponseType = {
    message_template: MessageTemplateType
    isLoading: boolean
}
