type TopListItemType = {
    id: string
    name: string
}

export const TopListItem = ({ id, name }: TopListItemType) => {
    return (
        <div className="col-md-4 text-center border-red">
            <p className='font-15 mt-md-5'>{name}</p>
            <div className="mt-md-4 mb-md-5 text-center">
                <a href={`/message_post?radio_program=${id}`} className='bg-main top_list_btn'>メールを送る</a>
            </div>
        </div>
    )
}
