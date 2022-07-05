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
    listenerMyProgram?: {
        name?: string
    }
    myProgramCorner?: {
        name?: string
    }
    radioProgram?: {
        name?: string
    }
    programCorner?: {
        name?: string
    }
}

export type MessagesResponseType = {
    listener_message: {
        data: MessageType[]
    }
    isLoading: boolean
}

export type MessageResponseType = {
    listener_message: MessageType
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
