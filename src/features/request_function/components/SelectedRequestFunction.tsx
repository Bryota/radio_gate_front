type SelectedRequestFunctionType = {
    name?: string
}

export const SelectedRequestFunction = ({ name }: SelectedRequestFunctionType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="row underline-green p-1rem">
                    <p className='font-40'>{name}</p>
                </div>
            </div>
        </>
    )
}
