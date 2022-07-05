export type ProfileType = {
    id: number
    last_name?: string
    first_name?: string
    last_name_kana?: string
    first_name_kana?: string
    radio_name?: string
    post_code?: string
    prefecture?: string
    city?: string
    house_number?: string
    building?: string
    room_number?: string
    tel?: string
    email: string
}

export type ProfileResponseType = {
    listener: ProfileType
    isLoading: boolean
}

export type ProfileItemType = {
    label: string
    value?: string
    is_first_item?: boolean
    no_value?: boolean
}

