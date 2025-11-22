function ColumnStat({value=0, max=0, title="15 - 18"}) {
    return ( 
        <div className="flex flex-col items-center w-100 mt-4">
            <div className="w-full h-full relative group">
                <div title={ 'Có ' + value + " hồ sơ có tổng điểm 3 môn "+ title + 'đ'} className="top-auto w-full absolute bottom-0 text-transparent bg-indigo-300 rounded-t-md group-hover:bg-indigo-500 transition-all cursor-pointer" style={{height: `${(((value/max) || 0.01)*100).toFixed(0)}%`}}>
                    <span className="text-transparent fw-bold group-hover:text-indigo-800 transition-all absolute -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{value}</span>
                </div>
            </div>
            <span className="mt-2 fs-6">{title}</span>
        </div>
    );
}

export default ColumnStat;