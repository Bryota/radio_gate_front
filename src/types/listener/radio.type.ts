export type RadioStationType = {
    id?: number
    name?: string
}

export type RadioStationsResponseType = {
    data: RadioStationType[]
    isLoading: boolean
    last_page: number
}

export type RadioStationNameResponseType = {
    radio_station_name: string
    isLoading: boolean
}

export type RadioProgramType = {
    id?: number
    name?: string
    email?: string
    program_corners?: ProgramCornersType[]
    my_program_corners?: ProgramCornersType[]
}

export type RadioProgramsResponseType = {
    radio_station_name: string
    radio_programs: {
        data: RadioProgramType[]
        last_page: number
    }
    isLoading: boolean
}

export type RadioProgramResponseType = {
    id?: number
    name?: string
    email?: string
    radio_station_id?: string
    program_corners?: ProgramCornersType[]
    my_program_corners?: ProgramCornersType[]
    isLoading: boolean
}

export type RadioProgramsUrlParamsType = {
    radioStationId: string
}

export type ProgramCornersType = {
    id: number
    radio_program_id: number
    listener_my_program_id: number
    name: string
}

export type ProgramCornersResponseType = {
    program_corners: {
        data: ProgramCornersType[]
    }
    isLoading: boolean
}

export type CornerType = {
    id: number
    name: string
    programId?: number
}

export type MyRadioProgramsResponseType = {
    data: RadioProgramType[]
    isLoading: boolean
    last_page: number
}

export type MyRadioProgramResponseType = {
    id?: number
    name?: string
    email?: string
    program_corners?: ProgramCornersType[]
    my_program_corners?: ProgramCornersType[]
    isLoading: boolean
}

export type MyProgramCornersResponseType = {
    data: CornerType[]
    isLoading: boolean
}
