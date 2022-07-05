export type RadioStationType = {
    id?: number
    name?: string
}

export type RadioStationsResponseType = {
    radio_stations: {
        data: RadioStationType[]
    }
    isLoading: boolean
}

export type RadioStationNameResponseType = {
    radio_station_name: string
    isLoading: boolean
}

export type RadioProgramType = {
    id?: number
    name?: string
    email?: string
}

export type RadioProgramsResponseType = {
    radio_programs: {
        data: RadioProgramType[]
    }
    isLoading: boolean
}

export type RadioProgramResponseType = {
    radio_program: RadioProgramType
    isLoading: boolean
}

export type RadioProgramsUrlParamsType = {
    radioStationId: string
}

export type ProgramCornersType = {
    id: number
    radio_program_id: number
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
    listener_my_programs: {
        data: RadioProgramType[]
    }
    isLoading: boolean
}

export type MyRadioProgramResponseType = {
    listener_my_program: RadioProgramType
    isLoading: boolean
}

export type MyProgramCornersResponseType = {
    my_program_corners: {
        data: CornerType[]
    }
    isLoading: boolean
}
