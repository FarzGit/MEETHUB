
// import './landingPageNav.css'
import { FaUserFriends } from "react-icons/fa";

const AdminNavBar = () => {


    return (
        <>

            
                <div className=" h-screen w-[250px] bg-[#121621]">

                    <div className="h-[150px] border-b border-[#414141] flex justify-center items-center gap-3">

                        <img className="h-[50px]" src="/src/assets/iamges/second-project-logo-single.png" alt="" />
                        <h1 className="text-white font-bold text-[30px]">MEETHUB</h1>


                    </div>

                    <div className="p-7">
                        <div className="flex justify-start items-center gap-2">
                            <span>
                                <FaUserFriends color="white" />
                            </span>
                            <h1 className="text-[#9c9c9c] cursor-pointer" >Customers</h1>
                        </div>

                    </div>

                </div>
                

        </>
    )
}

export default AdminNavBar



