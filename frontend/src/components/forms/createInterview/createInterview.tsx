


import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import style from '../ModalStyles/modalStyle.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store.ts';
import { closeInterviewModal } from '../../../slices/modalSlice/createInterviewSlice.ts';
import '../SignUp/signUp.css'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../context/SocketProvider.tsx';
import axios from 'axios'

const CreateInterviewModal: React.FC = () => {

 
    const [time,setTime] = useState('')
    const [topic,setTopic] = useState('')
    const navigate = useNavigate()

    const openModal = useSelector((state: RootState) => state.createInterviewSlice.value)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closeInterviewModal())
    }

    const {socket} = useSocket()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
          const res  = await axios.get('http://localhost:8000/create-room')
          
            const roomId = res.data.roomId
            console.log('the result from BK',roomId)
            if(res){
              socket.emit('room:join',{roomId,time,topic})
              navigate(`/meet/${roomId}`)
          }else{
            console.log('something went wrong please')
          }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: '#159CDB', fontWeight: 600 }}>
                        Create a Interview
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <form onSubmit={handleSubmit}>

                                <span className="text-[15px] p-1 text-gray-700">Topic</span>
                                <input
                                    type="text"
                                    name='topic'
                                    value={topic}
                                    onChange={e=> setTopic(e.target.value)}
                                    placeholder="topic"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />

                                <span className="text-[15px] p-1 text-gray-700">Duration</span>
                                <input
                                    type="number"
                                    placeholder="time"
                                    value={time}
                                    onChange={e=> setTime(e.target.value)}
                                    name='time'
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />


                                




                                <div  className="flex  items-center pt-4 justify-center gap-5">
                                    <button type='submit' className="bg-blue-500 rounded-md h-[40px] w-[110px]   text-white">Create</button>
                                </div>
                            </form>
                        </div>

                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateInterviewModal;