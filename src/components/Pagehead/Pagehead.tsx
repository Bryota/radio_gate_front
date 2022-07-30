type PageHeadType = {
    title: string,
    subtitle: string
}

export const Pagehead = (props: PageHeadType): JSX.Element => {
    return (
        <div className='d-flex align-items-center'>
            <h1 className='font-40' data-testid='page-head'>{props.title}</h1>
            <p className='mx-2 mt-2'>|</p>
            <p className='mt-2 font-25'>{props.subtitle}</p>
        </div>
    )
}
