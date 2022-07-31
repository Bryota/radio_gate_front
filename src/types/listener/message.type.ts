export type MessageType = {
    id: number
    radioProgramId: string
    programCornerId: string
    listenerMyProgramId: string
    myProgramCornerId: string
    subject?: string
    content: string
    radioName?: string
    posted_at: string
    listenerInfoFlag: boolean
    telFlag: boolean
    createdAt: string
    updatedAt: string
    listener_my_program?: {
        name?: string
    }
    my_program_corner?: {
        name?: string
    }
    radio_program?: {
        name?: string
    }
    program_corner?: {
        name?: string
    }
}

export type MessagesResponseType = {
    data: MessageType[]
    isLoading: boolean
}

export type MessageResponseType = {
    id: number
    radioProgramId: string
    programCornerId: string
    listenerMyProgramId: string
    myProgramCornerId: string
    subject?: string
    content: string
    radio_name?: string
    posted_at: string
    listener_info_flag: boolean
    tel_flag: boolean
    createdAt: string
    updatedAt: string
    listener_my_program?: {
        name?: string
    }
    my_program_corner?: {
        name?: string
    }
    radio_program?: {
        name?: string
    }
    program_corner?: {
        name?: string
    }
    isLoading: boolean
}

export type MessageItemType = {
    itemName: string
    value?: string
}

export type MessageListType = {
    id?: number
    radioProgram?: string
    corner?: string
    postDate?: string
}

export type SelectedMessageType = {
    id?: number
    name?: string
    postDate?: string
}
