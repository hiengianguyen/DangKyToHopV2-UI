function CommentGender({title, color}) {
    return ( 
        <div className="flex items-center gap-2">
            <div className="w-6 h-4 rounded-xl" style={{backgroundColor: color}}></div>
            <span>{title}</span>
        </div>
     );
}

export default CommentGender;