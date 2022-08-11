type PageHeadType = {
    title: string,
    subtitle: string
}

export const Pagehead = (props: PageHeadType): JSX.Element => {
    return (
        <div className='d-md-flex align-items-center mt-3 mb-3'>
            <h1 className='font-40 font-md-30 mt-2 mb-0' data-testid='page-head'>{props.title}</h1>
            <p className='mx-2 mt-2 d-none d-md-flex'>|</p>
            <p className='mt-2 font-25 font-md-20 '>{props.subtitle}</p>
        </div>
    )
}
