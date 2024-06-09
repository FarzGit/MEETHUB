import { IoIosCall } from "react-icons/io";
import { BsFillMicMuteFill } from "react-icons/bs";
import { MdOutlineScreenShare } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { RiMore2Fill } from "react-icons/ri";
import './meet.css';
import { useState } from 'react';

const MeetInterface = () => {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            <div className="p-3 bg-[#21242B] h-screen">
                <div className="flex justify-start items-center gap-3">
                    <img className="h-[60px]" src="src/assets/iamges/second-project-logo-single.png" alt="logo" />
                    <h1 className="text-white font-bold text-2xl">MEETHUB</h1>
                </div>
                <div className="bg-[#1A1B20] h-[500px] rounded-xl">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">asdfasdf</div>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">asdfasdf</div>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">asdfasdf</div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-center">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4 flex gap-8 justify-center">
                            <div className="bg-white p-1 rounded-lg">
                                <p className="flex text-white font-medium gap-2">
                                    <span><HiMiniSpeakerWave size={30} color="black" /></span>
                                </p>
                            </div>
                            <div className="bg-white p-1 rounded-lg">
                                <p className="flex text-white font-medium gap-2">
                                    <span><FaVideo size={30} color="black" /></span>
                                </p>
                            </div>
                            <div className="bg-red-700 p-1 rounded-lg">
                                <p className="flex text-white font-medium gap-2">
                                    <span><IoIosCall color="white" size={30} /></span>
                                </p>
                            </div>
                            <div className="bg-white p-1 rounded-lg">
                                <p className="flex text-white font-medium gap-2">
                                    <span><BsFillMicMuteFill size={30} color="black" /></span>
                                </p>
                            </div>
                            <div className="bg-white p-1 rounded-lg">
                                <p className="flex text-white font-medium gap-2">
                                    <span><MdOutlineScreenShare size={30} color="black" /></span>
                                </p>
                            </div>
                            <div className="">
                                <div onClick={toggleMenu} className="cursor-pointer">
                                    <RiMore2Fill size={30} color="white" />
                                </div>
                                {menuVisible && (
                                    <div className="dropup-menu">
                                        <ul>
                                            <li>Option 1</li>
                                            <li>Option 2</li>
                                            <li>Option 3</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MeetInterface;
