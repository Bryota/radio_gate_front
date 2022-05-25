import '../../../assets/css/components/sidebar.css';

export const AdminSidebar = (): JSX.Element => {
    return (
        <div className='bg-white p-3 admin-sidebar'>
            <div>
                <div>
                    <label htmlFor="radio_station" className="font-20">ラジオ局</label>
                </div>
                <div className='mt-2'>
                    <input type="text" name="radio_station" id="radio_station" />
                </div>
            </div>
            <div className='mt-4'>
                <div>
                    <label htmlFor="radio_program" className="font-20">ラジオ番組</label>
                </div>
                <div className='mt-2'>
                    <input type="text" name="radio_program" id="radio_program" />
                </div>
            </div>
            <div className='mt-5 mb-3'>
                <button className='btn bg-accent'>検索</button>
            </div>
        </div>
    )
}
