import Moment from 'react-moment';
import '../../../assets/css/elements/radio.css';

type SelectedMessageType = {
    name?: string
    post_date?: string
}

export const SelectedMessage = ({ name, post_date }: SelectedMessageType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="underline-green p-1rem">
                    <p className='font-40'>{name}</p>
                </div>
                <p className='mt-2 ps-3 font-20'>
                    <Moment format='YYYY年MM月DD日 hh時mm分'>
                        {post_date}
                    </Moment>
                    <span className='mx-4'>投稿済み</span>
                </p>
            </div>
        </>
    )
}
