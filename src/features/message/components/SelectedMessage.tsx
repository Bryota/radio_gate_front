import Moment from 'react-moment';

import { SelectedMessageType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';

export const SelectedMessage = ({ name, postDate }: SelectedMessageType): JSX.Element => {
    return (
        <>
            <div className='mb-3 mb-md-5'>
                <div className="underline-green p-1rem">
                    <p className='font-40 font-md-30'>{name}</p>
                </div>
                <div className="mx-3 mt-3">
                    <p>
                        投稿：
                        <Moment format='YYYY年MM月DD日 HH時mm分'>
                            {postDate}
                        </Moment>
                    </p>
                </div>
            </div>
        </>
    )
}
