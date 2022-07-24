type FormInputType = {
    changeType: (event: React.ChangeEvent<HTMLInputElement>) => void
    keyword: string
    changeKeyword: (event: React.ChangeEvent<HTMLInputElement>) => void
    searchKeyword: () => void
}

export const SearchField = ({ changeType, keyword, changeKeyword, searchKeyword }: FormInputType) => {
    return (
        <div>
            <div>
                <div className='border-0 text-start p-0 m-0'>
                    <input id="type-all" type="radio" name="type" value="" defaultChecked={true} onChange={(e) => changeType(e)} />
                    <label htmlFor="type-all">
                        ALL
                    </label>
                    <input id="type-am" type="radio" name="type" value="AM" onChange={(e) => changeType(e)} />
                    <label htmlFor="type-am">
                        AM
                    </label>
                    <input id="type-fm" type="radio" name="type" value="FM" onChange={(e) => changeType(e)} />
                    <label htmlFor="type-fm">
                        FM
                    </label>
                </div>
                <div className='mt-4'>
                    <input type="search" name="keyword" id="keyword" className='search-keyword__input' value={keyword} onChange={(e) => changeKeyword(e)} />
                    <button className='search-keyword__button' onClick={searchKeyword}>検索</button>
                </div>
            </div>
        </div>
    )
}
