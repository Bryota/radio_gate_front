export type RadioStationsType = {
    id: number
    name: string
    created_at: string
    updated_at: string
}

export type ListType = {
    id?: number
    name?: string
    radio_program_id?: number
    is_first_item?: boolean
    click_action: (id: string) => void
}

export type RadioProgramType = {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
    radio_station: {
        name: string
    }
}

export type ProgramCornerType = {
    id: number
    name: string
    created_at: string
    updated_at: string
}

export type RadioProgramUrlParamsType = {
    id?: string
    radio_program_id?: string
}
