function TitleChart({title}) {
    return ( 
        <div className="flex w-100 items-center mb-8 gap-4">
            <h1 className="fs-1 fw-bold w-max">{title}</h1>
            <div className="h-3 bg-gray-300 flex-1"></div>
        </div>
    );
}

export default TitleChart;