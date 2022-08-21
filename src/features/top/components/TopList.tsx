import { TopListItem } from './TopListItem';

type TopListType = {
    listName: string
    radioPrograms?:
    {
        radio_program_id: string,
        radio_program_name: string
    }[]
}

export const TopList = ({ listName, radioPrograms }: TopListType) => {
    return (
        <div className='mt-md-4'>
            <span className='border-bottom border-dark border-2 pb-1 font-20'>{listName}</span>
            <div className='row mt-md-3 bg-white top_list'>
                {
                    radioPrograms?.map(radioProgram => {
                        return (
                            <TopListItem
                                id={radioProgram.radio_program_id}
                                name={radioProgram.radio_program_name}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
