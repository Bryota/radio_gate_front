export const SelectedRequestFunction = ({ name }: { name?: string }): JSX.Element => {
    return (
        <>
            <div className='mb-4 mb-md-5'>
                <div className="row underline-green p-1rem">
                    <p className='font-40 font-md-30'>{name}</p>
                </div>
            </div>
        </>
    )
}
