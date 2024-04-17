import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FcGoogle } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { closeSignupModal } from '../../slices/modalSlice/signupModalSlice';



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

const MyModal: React.FC = () => {
    const openModal = useSelector((state: RootState) => state.signupModal.value);
    const dispatch = useDispatch();

    const handleClose = () => {
        console.log('entered');
        dispatch(closeSignupModal());
    };

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
                        Sign Up
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <form>
                                <span className="text-[15px] p-1 text-gray-700">Username</span>
                                <input
                                    type="text"
                                    placeholder="username"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                                <span className="text-[15px] p-1 text-gray-700">Email</span>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                                <span className="text-[15px] p-1 text-gray-700">Password</span>
                                <input
                                    type="text"
                                    placeholder="Password"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                                <span className="text-[15px] p-1 text-gray-700">Confirm password</span>
                                <input
                                    type="text"
                                    placeholder="Confirm password"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                            </form>
                        </div>

                        <div className="flex pt-4 justify-center">
                            <button className="bg-blue-500 rounded-md h-[40px] w-[110px] mr-5  text-white">SignUp</button>
                            <button className=" rounded-md h-[40px] p-2 w-[110px] flex gap-2 border">
                                <span className="pt-1">
                                    <FcGoogle />
                                </span>
                                SignIn
                            </button>
                        </div>

                        <div className="flex justify-center text-[13px] pt-2 ">
                            <span className="text-gray-600">
                                Already have an account ?<span className="text-blue-500"> SignIn</span>
                            </span>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default MyModal;
