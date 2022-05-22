import '../../assets/css/components/pagehead.css';

type PageHeadType = {
    title: string,
    subtitle: string
}

export const Pagehead = (props: PageHeadType): JSX.Element => {
    return (
        <div className='d-flex align-items-center'>
            <h1 className='pagehead-title'>{props.title}</h1>
            <p className='pagehead-line'>|</p>
            <p className='pagehead-subtitle'>{props.subtitle}</p>
        </div>
    )
}
