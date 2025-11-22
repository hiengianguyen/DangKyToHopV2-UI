import classNames from 'classnames/bind';
import style from './StartCard.module.scss'

const cx = classNames.bind(style);

function StartCard({title='', color='', value=0, subText='', icon }) {
    return ( 
    <div className={cx("wrapper","flex justify-between w-100 gap-4 rounded-xl bg-white shadow-sm border p-10 border-gray-100")}>
        <div className="flex flex-col">
            <span className="fs-2 text-gray-500">{title}</span>
            <span className="fw-bold" style={{fontSize: '30px'}}>{value}</span>
            {subText && <p>{subText}</p>}
        </div>
        <div className={`p-4 rounded-lg ${color} flex justify-center items-center size-24 text-white shadow`}>
            {icon}
        </div>
    </div> );
}

export default StartCard;