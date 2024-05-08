import AdminNavBar from "../../../components/Navbar/adminNavBar"
import { useGetUsersMutation, useBlockAndUnblockUserMutation } from "../../../slices/adminSlice"
import { useEffect, useState } from "react"
import { IUser } from "../../../validations/validationTypes"
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../redux/store"
import { userLogOut } from "../../../slices/authSlice"
import { useLogoutMutation } from "../../../slices/userSlice"

const UsersList = () => {
    const [getUsers] = useGetUsersMutation()
    const [blockAndUnblockUser] = useBlockAndUnblockUserMutation()
    const [users, setUsers] = useState<IUser[]>([])
    const  userInfo  = useSelector((state:RootState) => state.authSlice.userInfo)
    console.log('werwewwwwwwwwwwwwwww',userInfo)
    const dispatch = useDispatch()
    const [logout] = useLogoutMutation()
    const [search, setSearch] = useState('')
    const [debouncing,setDebouncing] = useState('')




    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUsers('').unwrap()
                setUsers(user.data)
            } catch (err) {
                console.error('Failed to fetch users:', err)
                Swal.fire('Error', 'Failed to load users data.', 'error')
            }
        }
        fetchData()
    }, [])

    const handleButton = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to block/unblock this user.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, block/unblock it!'
        });

        if (result.isConfirmed) {
            try {
                 await blockAndUnblockUser({ id }).unwrap()
                 console.log('entered uerlist',userInfo)
                 console.log('entered uerlist',userInfo?._id)
                 console.log('entered uerlist',id)

                 if (userInfo && userInfo._id === id) {
                    console.log('entered uerlist')
                    await logout('').unwrap()
                    dispatch(userLogOut())
                }
                
                setUsers(users => users.map(user => {
                    if (user._id === id) {
                        return { ...user, isBlocked: !user.isBlocked }
                    }
                    return user
                }))
                
               
                Swal.fire('Success', 'User blocked/unblocked successfully!', 'success')
            } catch (error) {
                console.error(error)
                Swal.fire('Error', 'Failed to block/unblock user.', 'error')
            }
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncing(search);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);
    

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(debouncing.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncing.toLowerCase())
    )

    return (
        <>
            <div className="flex">
                <AdminNavBar />
                <div className="h-[60px] w-[100%] border-b flex flex-col p-2">
                    <div className="flex justify-end p-2">
                        <button className="border w-[80px] rounded-md border-red-500 text-rose-600" onClick={() => dispatch(userLogOut())}>Logout</button>
                    </div>
                    <div className="p-4">
                        <h1 className="text-4xl font-semibold">Customers</h1>
                    </div>
                    <div className="h-[100px] p-4 rounded-xl border shadow-md">
                        <input className="border rounded-lg h-[45px] w-[30%] p-4" type="search" placeholder="Search" value={search} onChange={handleSearch} />
                    </div>
                    <div className="p-4 rounded-xl border shadow-md mt-8">
                        <table className="w-full border-2">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Blocked</th>
                                    <th className="border px-4 py-2">Premium</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2 font-semibold">{user.username}</td>
                                        <td className="border px-4 py-2 font-semibold">{user.email}</td>
                                        <td className="border px-4 py-2">
                                            <div className="flex justify-center" onClick={() => handleButton(user._id)}>
                                                {user.isBlocked ? (
                                                    <button className="bg-red-500 py-1 px-5 font-semibold text-white rounded-lg transition-transform duration-200 hover:scale-90 hover:bg-red-700">
                                                        True
                                                    </button>
                                                ) : (
                                                    <button className="bg-green-500 py-1 px-5 font-semibold text-white rounded-lg transition-transform duration-200 hover:scale-90 hover:bg-green-700">
                                                        False
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className="border px-4 py-2">
                                            <div className="flex justify-center">
                                                {user.isPremium ? (
                                                    <button className="text-green-600 py-1 px-5 font-semibold rounded-lg">True</button>
                                                ) : (
                                                    <button className="text-red-600 font-bold font-mono py-1 px-5 rounded-lg">False</button>
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
