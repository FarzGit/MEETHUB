


import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import style from '../ModalStyles/modalStyle.tsx';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store.ts';
import { closeInterviewModal } from '../../../slices/modalSlice/createInterviewSlice.ts';
import '../SignUp/signUp.css'
import { Link } from 'react-router-dom';


const CreateInterviewModal: React.FC = () => {


    const openModal = useSelector((state:RootState)=>state.createInterviewSlice.value)
    const dispatch = useDispatch()

    
    const handleClose = ()=>{

        dispatch(closeInterviewModal())

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
                            <form >

                                <span className="text-[15px] p-1 text-gray-700">Topic</span>
                                <input
                                    type="text"
                                    name='email'
                                    placeholder="topic"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                               
                                <span className="text-[15px] p-1 text-gray-700">Duration</span>
                                <input
                                    type="password"
                                    placeholder="time"
                                    name='password'
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                       
                                
                            <div className="flex flex-col items-center pt-4 justify-center gap-5">
                                    <Link to='/meet'  className="bg-blue-500 rounded-md h-[40px] w-[110px]   text-white">Create</Link>
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