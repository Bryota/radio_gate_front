export type ProfileResponseType = {
    id: number
    last_name?: string
    first_name?: string
    full_name?: string
    last_name_kana?: string
    first_name_kana?: string
    full_name_kana?: string
    radio_name?: string
    post_code?: string
    address?: string
    prefecture?: string
    city?: string
    house_number?: string
    building?: string
    room_number?: string
    tel?: string
    email: string
    isLoading: boolean
}

export type ProfileItemType = {
    label: string
    value?: string
    is_first_item?: boolean
    no_value?: boolean
}

