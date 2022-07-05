export type RequestFunctionType = {
    id: number
    name: string
    detail: string
    point: number
    is_open: boolean
    created_at: string
    updated_at: string
}

export type RequestFunctionListType = {
    id: number
    name: string
    post_date: string
    click_action: (id: string) => void
}
