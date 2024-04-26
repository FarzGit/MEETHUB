
// import './landingPageNav.css'
import { FaUserFriends } from "react-icons/fa";

const AdminNavBar = () => {


    return (
        <>

            <div className=" flex">
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
                <div className="h-[60px] w-[100%]  border-b  flex flex-col p-2 ">
                    <div className="flex justify-end p-2">
                        <button className="border w-[80px] rounded-md border-red-500 text-rose-600">Logut</button>
                    </div>
                    <div className="p-4">
                        <h1 className="text-4xl font-semibold">Customers</h1>
                    </div>

                    <div className=" h-[100px]  p-4 rounded-xl border shadow-md">

                        <input className="border rounded-lg h-[45px] w-[30%] p-4" type="search" placeholder="Search " />


                    </div>

                    <div className="h-[100px] p-4 rounded-xl border shadow-md mt-8">
    <table className="border-collapse w-full border border-gray-400">
        <thead>
            <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Age</th>
                <th className="border border-gray-400 px-4 py-2">Location</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="border border-gray-400 px-4 py-2">John</td>
                <td className="border border-gray-400 px-4 py-2">30</td>
                <td className="border border-gray-400 px-4 py-2">New York</td>
            </tr>
            <tr className="bg-gray-100">
                <td className="border border-gray-400 px-4 py-2">Alice</td>
                <td className="border border-gray-400 px-4 py-2">25</td>
                <td className="border border-gray-400 px-4 py-2">Los Angeles</td>
            </tr>
            <tr>
                <td className="border border-gray-400 px-4 py-2">Bob</td>
                <td className="border border-gray-400 px-4 py-2">35</td>
                <td className="border border-gray-400 px-4 py-2">Chicago</td>
            </tr>
        </tbody>
    </table>
</div>

                </div>
            </div>

        </>
    )
}

export default AdminNavBar



