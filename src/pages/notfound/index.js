import { NotFound } from "../../assets"

function PageNotFound(){
    return(
        <>
            <div className="grid h-screen place-items-center pb-24">
                <img className="w-9/12" src={NotFound} alt="notfound"/>
                <a href="/" className="bg-blue-800 font-poppins text-lg px-4 py-2 text-white rounded-md">Go Back to Homepage</a>
            </div>
        </>
    )
}
export default PageNotFound;