import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { closeOtpModal } from '../../../slices/modalSlice/otp';
import { IoClose } from "react-icons/io5";


const style: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '28%',
    backgroundColor: 'background.paper',
    border: 'none',
    padding: 4,
    borderRadius: 2,
};

const OtpModal: React.FC = () => {

    const dispatch = useDispatch()
    const openModal = useSelector((state:RootState)=>state.OtpSlice.value)

    const handleClose = ()=>{
        dispatch(closeOtpModal())
    }


    return (
        <div>
            <Modal
                open={openModal}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: '#159CDB', fontWeight: 600 }}>
                        <div className='flex justify-between'>
                            <span>Otp</span>
                            <span className='cursor-pointer' onClick={handleClose}><IoClose color='grey' /></span>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <form>

                                <span className="text-[15px] p-1 text-gray-700">One time password</span>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />


                            </form>
                        </div>

                        <div className="flex pt-4 justify-center">
                            <button className="bg-blue-500 rounded-md h-[40px] w-[110px] mr-5  text-white">Verify</button>

                        </div>

                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default OtpModal;
