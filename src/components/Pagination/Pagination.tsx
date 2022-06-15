import ArrowLeft from '../../assets/images/arrow_left.svg';
import ArrowRight from '../../assets/images/arrow_right.svg';
import '../../assets/css/components/pagination.css';

type PaginationType = {
    currentPage?: number
    prev_action?: () => void
    next_action?: () => void
}

export const Pagination = ({ currentPage = 0, prev_action = () => { }, next_action = () => { } }: PaginationType): JSX.Element => {
    return (
        <div className='d-flex text-center justify-content-evenly align-items-center mt-5 pb-5'>
            <button className='p-3 bg-white pagination-item' onClick={() => prev_action()} disabled={currentPage === 1 ? true : false}>
                <img src={ArrowLeft} alt="＜" />
            </button>
            <p className='font-20'>{currentPage}</p>
            <button className='p-3 bg-white pagination-item' onClick={() => next_action()}>
                <img src={ArrowRight} alt="＞" />
            </button>
        </div>
    )
}
