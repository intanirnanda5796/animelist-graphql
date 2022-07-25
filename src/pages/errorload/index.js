import { LoadError } from "../../assets"
function PageLoadError(){
    return(
        <>
            <div className="grid h-screen place-items-center pb-20">
                <img className="w-6/12" src={LoadError} alt="load error"/>
                <h1 className="font-poppins text-blue-800 text-base text-center md:text-2xl font-semibold pb-4">You are getting erorr when loading the Data on this page ! :( Please Try again</h1>
                <div className="pb-20"><a href="/" className="bg-blue-800 font-poppins text-lg px-4 py-2 text-white rounded-md">Go Back to Homepage</a></div>
                
            </div>
        </>
    )
}
export default PageLoadError;