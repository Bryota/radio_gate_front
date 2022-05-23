import ArrowLeft from '../../assets/images/arrow_left.svg';
import ArrowRight from '../../assets/images/arrow_right.svg';
import '../../assets/css/components/pagination.css';

export const Pagination = (): JSX.Element => {
    return (
        <div className='d-flex text-center justify-content-evenly mt-5 pb-5'>
            <button className='p-3 bg-white pagination-item'>
                <img src={ArrowLeft} alt="＜" />
            </button>
            <button className='p-3 bg-white pagination-item'>
                <img src={ArrowRight} alt="＞" />
            </button>
        </div>
    )
}
