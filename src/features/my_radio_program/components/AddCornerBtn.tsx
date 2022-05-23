import '../../../assets/css/elements/radio.css';

export const AddCornerBtn = (): JSX.Element => {
    return (
        <>
            <div className="row">
                <h2 className="col-4">コーナー一覧</h2>
                <div className='col-8 text-right'>
                    <button className='font-20 p-1rem bg-accent radio_add_btn'>コーナーを追加</button>
                </div>
            </div>
        </>
    )
}
