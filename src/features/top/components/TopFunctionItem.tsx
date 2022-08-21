type TopListItemType = {
    name: string
    icon: string
    url: string
}

export const TopFunctionItem = ({ name, icon, url }: TopListItemType) => {
    return (
        <div className="col-4 mt-3">
            <div className="bg-white w-75 mx-auto top_function_item py-md-4">
                <div className='mb-md-3'>
                    <img src={icon} alt="" />
                </div>
                <p className='mb-md-4'>{name}</p>
                <a href={`/${url}`} className='bg-accent top_function_btn'>機能を使う</a>
            </div>
        </div>
    )
}
