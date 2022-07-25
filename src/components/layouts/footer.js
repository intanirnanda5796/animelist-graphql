import { Icon } from '@iconify/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { DarkLightContext } from "../../context";

const Footer = () => {
    const { theme } = useContext(DarkLightContext)
    const navigate = useNavigate();

    const handleHomepage = () => {
        navigate('/')
    }

    const handleCollection = () => {
        navigate('/collection')
    }

    return(
        <div className={theme ? "md:hidden flex px-4 py-2 fixed bottom-0 inset-x-0 z-10 bg-gray-800 flex-row space-x-20 justify-center" : "md:hidden flex px-4 py-2 fixed bottom-0 inset-x-0 z-50 bg-blue-800 flex-row space-x-20 justify-center"}>
            <div className="flex flex-col space-y-1 place-items-center" onClick={() => handleHomepage()}>
                <Icon icon="ant-design:home-filled" className="text-white text-center" width={25}/>
                <h1 className="font-poppins text-white text-xs" href="/">Homepage</h1>
            </div>
            <div className="flex flex-col space-y-1 place-items-center" onClick={() => handleCollection()}>
                <Icon icon="ant-design:folder-filled" className="text-white text-center" width={25}/>
                <h1 className="font-poppins text-white text-xs"  href="/collection">My Collection</h1>
            </div>
        </div>
    )
}
export default Footer;