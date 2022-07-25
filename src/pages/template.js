import { useContext } from "react";
import { Navbar, Footer } from "../components";
import { DarkLightContext } from "../context";

function Template({ children }){
    const { theme } = useContext(DarkLightContext)

    return(
       <>
        <Navbar />
            <div className={theme ? "bg-gray-200" : "bg-white"}>
                <div className="h-max">
                    {children}
                </div>
            </div>
        <Footer />
       </>
    )
}
export default Template;