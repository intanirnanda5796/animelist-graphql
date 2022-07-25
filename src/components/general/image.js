function Image({src}){
    return(
        <img className="rounded-md w-40 md:w-72 md:h-max" src={src} alt="img"/>
    )
}
export default Image;