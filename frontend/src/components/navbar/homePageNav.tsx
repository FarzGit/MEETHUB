
import './landingPageNav.css'
import { MdWorkspacePremium } from "react-icons/md";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";




const HomePageNav = (): JSX.Element => {




    return (

        <>
            <div className="maindiv pl-[75px] pr-[75px] max-sm:pl-[30px] max-sm:pr-[20px] max-sm:pl-[10px]">
                <div className='navbar h-[130px]'>
                    <div className='flex justify-between items-center h-[130px]' >
                        <img className='logo md:h-[90px] max-[400px]:h-[50px] ' src="/src/assets/iamges/second-project-logo.png" alt="Logo" />
                        <div className='flex justify-end w-[30%] gap-2 '>
                            <button className='flex justify-center items-center outline outline-1 outline-zinc-400 rounded-md p-1 text-blue-400 w-[40px] h-[40px] text-[14px]  '><MdWorkspacePremium color='green' size={30} /></button>
                            <button className='flex justify-center items-center outline outline-1 outline-zinc-400 rounded-md p-1 text-zinc-400 w-[40px] h-[40px] text-[14px] max-sm:hidden '><BsFillBrightnessHighFill size={30} color='#222831' /></button>
                            <button className=" profile max-sm:flex max-sm:justify-center outline outline-1 outline-zinc-400 rounded-md p-2 text-gray-800 font-semibold  h-[40px] text-[14px] sm:truncate sm:w-[100px] ">
                                <span className="hidden max-sm:inline"><FaUser /></span>
                                <span className='max-sm:hidden '>Farzin Ahammed</span>
                            </button>

                        </div>

                    </div>
                </div>
            </div>


        </>

    )
}


export default HomePageNav
