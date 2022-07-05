export type RequestFunctionRequestType = {
    id: number
    name: string
    detail: string
    created_at: string
    updated_at: string
}

export type RequestFunctionRequestListType = {
    id: number
    name: string
    post_date: string
    click_action: (id: string) => void
}
