import ArrowLeft from '../../assets/images/arrow_left.svg';
import ArrowRight from '../../assets/images/arrow_right.svg';
import '../../assets/css/components/pagination.css';

type PaginationType = {
    currentPage?: number
    lastPage?: number | undefined
    prevAction?: () => void
    nextAction?: () => void
}

export const Pagination = ({ currentPage = 0, lastPage = 0, prevAction = () => { }, nextAction = () => { } }: PaginationType): JSX.Element => {
    return (
        <div className='d-flex text-center justify-content-evenly align-items-center mt-5 pb-5'>
            <button className='p-3 bg-white pagination-item' onClick={() => prevAction()} disabled={currentPage === 1 ? true : false}>
                <img src={ArrowLeft} alt="＜" />
            </button>
            <p className='font-20'>{currentPage}</p>
            <button className='p-3 bg-white pagination-item' onClick={() => nextAction()} disabled={currentPage === lastPage ? true : false}>
                <img src={ArrowRight} alt="＞" />
            </button>
        </div>
    )
}
