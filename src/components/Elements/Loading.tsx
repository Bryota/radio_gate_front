import { Bars } from 'react-loader-spinner';
import '../../assets/css/components/loading.css';

export const Loading = (): JSX.Element => {
    return (
        <div className='loading-bg'>
            <div className='loading-icon'>
                <Bars
                    height="100"
                    width="100"
                    color='#A8CE30'
                    ariaLabel='loading-indicator'
                />
            </div>
        </div>
    )
}
