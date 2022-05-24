type PageHeadType = {
    title: string,
}

export const AdminPagehead = ({ title }: PageHeadType): JSX.Element => {
    return (
        <div className='align-items-center text-center'>
            <h1 className='mt-0 pt-5 font-40'>{title}</h1>
        </div>
    )
}
