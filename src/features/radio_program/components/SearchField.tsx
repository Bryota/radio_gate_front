type FormInputType = {
    changeDay: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function SearchField({ changeDay }: FormInputType) {
    return (
        <div>
            <div className='text-start p-0 mt-4'>
                <input id="day-all" type="radio" name="day" value="" defaultChecked={true} onChange={(e) => changeDay(e)} />
                <label className="radio-program-search" htmlFor="day-all">
                    全曜日
                </label>
                <input id="day-monday" type="radio" name="day" value="月曜日" onChange={(e) => changeDay(e)} />
                <label className="radio-program-search" htmlFor="day-monday">
                    月曜日
                </label>
                <input id="day-tuesday" type="radio" name="day" value="火曜日" onChange={(e) => changeDay(e)} />
                <label className="radio-program-search" htmlFor="day-tuesday">
                    火曜日
                </label>
                <input id="day-wednesday" type="radio" name="day" value="水曜日" onChange={(e) => changeDay(e)} />
                <label className="radio-program-search" htmlFor="day-wednesday">
                    水曜日
                </label>
            </div>
            <div className='text-start p-0 mt-md-2'>
                <input id="day-thursday" type="radio" name="day" value="木曜日" onChange={(e) => changeDay(e)} />
                <label className="radio-program-search" htmlFor="day-thursday">
                    木曜日
                </label>
                <input id="day-friday" type="radio" name="day" value="金曜日" onChange={(e) => changeDay(e)} />
                <label className="radio-program-search" htmlFor="day-friday">
                    金曜日
                </label>
                <input id="day-saturday" type="radio" name="day" value="土曜日" onChange={(e) => changeDay(e)} />
                <label className="radio-program-search" htmlFor="day-saturday">
                    土曜日
                </label>
                <input id="day-sunday" type="radio" name="day" value="日曜日" onChange={(e) => changeDay(e)} />
                <label className="radio-program-search" htmlFor="day-sunday">
                    日曜日
                </label>
            </div>
        </div>
    )
}
