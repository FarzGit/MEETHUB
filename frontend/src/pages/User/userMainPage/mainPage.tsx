/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect,useRef } from 'react'
import { RootState } from '../../../redux/store'
import HomePageNav from '../../../components/Navbar/homePageNav'
import './mainPage.css'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openInterviewModal } from '../../../slices/modalSlice/createInterviewSlice'
import CreateInterviewModal from '../../../components/forms/createInterview/createInterview'

import { useSocket } from '../../../context/SocketProvider'



const MainPage = () => {

    const {userInfo} = useSelector((state:RootState)=>state.authSlice)
    const userId = useRef<string>(Math.random().toString(36).substr(2, 9))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { socket } = useSocket()
    // const [roomId,setRoomId] = useState<string>('')

    useEffect(() => {
        if (userInfo) {
            navigate('/home');
        }
    }, []);



    const handleButton = ()=>{
        console.log("entered hjhjhh")
        dispatch(openInterviewModal())
    }


    const handleJoin = () => {
        const roomIdInput = document.getElementById('room-id-input') as HTMLInputElement;
        console.log('the room input is:',roomIdInput.value)
        if (roomIdInput && roomIdInput.value) {
            const roomId = roomIdInput.value;
            socket.emit('room:join-request', { roomId, userId: userId });
        }
    };

    return (
        <>
            <HomePageNav />
            <div className="landingMainDiv pl-[75px] pr-[75px] max ">
                <div className="md:flex justify-between items-center">
                    <div className="flex flex-col  w-[500px] max-sm:w-[100%] leading-[23px]  ">
                        <span className="font-normal text-[15px] md:text-[15px]  max-sm:leading-[15px] max-sm:text-[15px]" >Join or create Interview  </span>
                        <div className="pt-4 gap-3 flex ">
                            <input
                            id='room-id-input'
                                type="text"
                                placeholder="Enter room ID"
                                className="  mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            />
                            <button onClick={handleJoin} className="bg-blue-500 rounded-md h-[50px] w-[110px] mr-5  text-white">Join</button>
                        </div>
                        <button onClick={handleButton} className="bg-blue-500 rounded-md h-[50px] mr-5 mt-4  text-white">Create an Interview</button>

                    </div>
                    <div>
                        <img className="image xl:h-[330px] lg:h-[500px] md:h-[400px] max-sm:hidden  " src="/src/assets/iamges/homePageImage.png" alt="Image" />
                    </div>
                </div>
                <span >Previous Interviews</span>
                <div className="flex gap-5 pt-3">
                    <div className=" rounded-lg shadow-md p-4 bg-gray-200 h-[150px] w-[17%]">
                        {/* <img src='' alt='image' className="" /> */}

                    </div>
                    
                    
                    <div className=" rounded-lg shadow-md p-4 bg-gray-200 h-[150px] w-[17%]">
                        {/* <img src='' alt='image' className="w-full h-40 object-cover " /> */}

                    </div>


                    <span className="flex items-center p-5 text-gray-700 font-semibold ">See more...</span>

                </div>
                
<CreateInterviewModal/>
            </div>
        </>
    )
}

export default MainPage