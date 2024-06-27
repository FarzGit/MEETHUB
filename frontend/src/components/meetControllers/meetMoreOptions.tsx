
import { RiMore2Fill } from "react-icons/ri";
import { useState } from 'react';
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { SiCompilerexplorer } from "react-icons/si";
import { IoCloseOutline } from "react-icons/io5";
import { IoSend } from "react-icons/io5";


const MeetMoreOptions = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOffcanvasMenu, setShowOffcanvasMenu] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <>

      <div style={{ position: 'absolute', display: 'inline-block' }}>
        <div className="cursor-pointer" onClick={handleToggle}>
          <RiMore2Fill size={30} color="white" />
        </div>

        {isMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '-120px',
              right: 0,
              backgroundColor: 'white',
              boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',

              minWidth: '180px',
              borderRadius: '5px',
              padding: '8px',
            }}
            className="z-50">
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <div className="flex gap-3 cursor-pointer ">
                <img className="w-[20px]" src="../../../public/chatgpt-6.svg" alt="gpt-image" />
                <li onClick={() => console.log('Option 1 clicked')}>GPT</li>
              </div>
              <div className="flex gap-3 py-2 cursor-pointer" >
                <span className="pt-1">
                  <SiCompilerexplorer size={20} />
                </span>
                <li onClick={() => console.log('Option 2 clicked')}>IDE</li>
              </div>
              <div onClick={() => setShowOffcanvasMenu(!showOffcanvasMenu)} className="flex gap-3 cursor-pointer">
                <span className="pt-1">

                  <IoChatboxEllipsesOutline size={20} />
                </span>
                <li >Chat</li>
              </div>

            </ul>
          </div>
        )}

        <div className={`fixed top-0 right-0 max-sm:w-[30%] mt-[50px] rounded-lg w-[25%] h-[600px] bg-[#f3f2f2] z-50 transition-transform duration-500 ease-in-out ${showOffcanvasMenu ? 'transform translate-x-0 mr-7' : 'transform translate-x-full'}`}>
          {/* Offcanvas Menu Content */}
          <div className="pt-4 flex-col w-full h-full">
            <div
              onClick={() => setShowOffcanvasMenu(false)}
              className="px-5 mb-5 closing w-full flex justify-end text-xs right-0 cursor-pointer">
              <IoCloseOutline size={28} />
            </div>
            <div className="flex-grow">
              asdfsad
            </div>
            <div className="bg-[#f3f2f2] h-10 m-2 flex gap-2 fixed bottom-0 w-[calc(100%-15px)]">
              <div className="w-full">
                <input type="text" className="bottom-0 p-2 w-full rounded-lg outline-none" placeholder="Enter text here" />
              </div>
              <div className="flex items-center cursor-pointer">
                <span>
                  <IoSend size={25} color="grey" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MeetMoreOptions