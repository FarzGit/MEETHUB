import AdminNavBar from "../../../components/Navbar/adminNavBar"
import { useGetUsersMutation } from "../../../slices/adminSlice"
import { useEffect, useState } from "react"
import { IUser } from "../../../validations/validationTypes"
import { useBlockAndUnblockUserMutation } from "../../../slices/adminSlice"
import Swal from 'sweetalert2';
import { useSelector,useDispatch } from "react-redux"
import { RootState } from "../../../redux/store"
import { userLogOut } from "../../../slices/authSlice"
import { useLogoutMutation } from "../../../slices/userSlice"


const UsersList = () => {

    const [getUsers] = useGetUsersMutation()
    const [blockAndUnblockUser] = useBlockAndUnblockUserMutation()
    const [users, setUsers] = useState<IUser[]>([])
    const {userInfo} = useSelector((state:RootState)=>state.authSlice)
    const dispatch = useDispatch()
    const [logout] = useLogoutMutation()



    useEffect(() => {
        const fetchData = async () => {
            
                try {
                    const user = await getUsers('').unwrap()
                    setUsers(user.data)
                } catch (err) {
                    console.log(err)
                }
            }
        fetchData()
    }, [])


console.log(users);

    const handleButton = async(id:string)=>{
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to block/unblock this user.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, block/unblock it!'
        });

        if(result.isConfirmed){

            try {
                console.log(id)
                const res = await blockAndUnblockUser({id}).unwrap()
                if(res){
                setUsers((state) => {
                    return state.map(user => {
                        if (user._id === id) {
                            return { ...user, isBlocked: !user.isBlocked };
                        }
                        return user;
                    });
                });

                if (userInfo && userInfo._id === id) {
                    await logout('').unwrap()
                    dispatch(userLogOut());
                }
                }
              
                console.log(res)
                Swal.fire('Success', 'User blocked/unblocked successfully!', 'success');
                
            } catch (error) {
                console.log(error)
                
            }
        }




    }




    return (
        <>
            <div className="flex">
                <AdminNavBar />
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
                    <div className=" p-4 rounded-xl border shadow-md mt-8">
                        <table className=" w-full border-2">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border  px-4 py-2">Name</th>
                                    <th className="border  px-4 py-2">Email</th>
                                    <th className="border  px-4 py-2">Blocked</th>
                                    <th className="border  px-4 py-2">Premium</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user,index)=>(
                                
                                <tr key={index}>
                                    <td className="border  px-4 py-2 font-semibold">{user.username}</td>
                                    <td className="border  px-4 py-2 font-semibold">{user.email}</td>
                                    <td className="border  px-4 py-2">
                                        <div className="flex justify-center" onClick={()=>handleButton(user._id)}>
                                        {user.isBlocked?(
                                        <button className="bg-red-500 p-2 font-semibold text-white px-5 rounded-lg transition-transform duration-200 hover:scale-90 hover:bg-red-700" >
                                            True
                                        </button>
                                        ):(
                                            <button className="bg-green-500 p-2 font-semibold text-white px-5 rounded-lg transition-transform duration-200 hover:scale-90 hover:bg-green-700" >
                                            false
                                        </button>
                                        )}
                                        </div>
                                    </td>
                                    <td className="border  px-4 py-2">
                                        <div className="flex justify-center">
                                        {user.isPremium?(
                                            <button className="bg-green-500 p-2 font-semibold text-white px-5 rounded-lg">True</button>
                                        ):(
                                            <button className="bg-red-500 p-2 font-semibold text-white px-5 rounded-lg">False</button>
                                        )}
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}


export default UsersList