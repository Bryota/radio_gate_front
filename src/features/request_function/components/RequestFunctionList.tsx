import { RequestFunctionType } from '../../../types/listener';

export const RequestFunctionList = ({ id, name, point, is_voted }: RequestFunctionType): JSX.Element => {
    return (
        <>
            <div className='row align-items-center mt-4 p-2rem list-item'>
                <p className='col-5 font-25'>{name}</p>
                <p className='col-2 h4 mb-0'>{point}Pt</p>
                {
                    is_voted
                        ?
                        <p className='col-12 col-md-2 mt-3 mt-md-0 btn bg-disable list-btn'>
                            投票済み
                        </p>
                        :
                        <a href={`/request_function/${id}/vote`} className='col-12 col-md-2 mt-3 mt-md-0 btn list-btn'>
                            投票する
                        </a>
                }
                <a href={`/request_function/${id}`} className='col-12 col-md-2 offset-md-1 mt-3 mt-md-0 btn bg-main list-btn'>
                    詳細
                </a>
            </div>
        </>
    )
}
