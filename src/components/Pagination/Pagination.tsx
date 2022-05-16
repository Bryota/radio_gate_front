import ArrowLeft from '../../assets/images/arrow_left.svg';
import ArrowRight from '../../assets/images/arrow_right.svg';
import '../../assets/css/pagination.css';

export const Pagination = (): JSX.Element => {
    return (
        <div className='pagination-items'>
            <button className='pagination-item'>
                <img src={ArrowLeft} alt="" />
            </button>
            <button className='pagination-item'>
                <img src={ArrowRight} alt="" />
            </button>
        </div>
    )
}