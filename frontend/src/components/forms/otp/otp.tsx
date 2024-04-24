import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { closeOtpModal } from '../../../slices/modalSlice/otp';
import { IoClose } from "react-icons/io5";
import style from '../modalStyles/modalStyle';
import { useOtpVerificationMutation, useRegisterMutation, useSendOtpTOMailMutation } from '../../../slices/userSlice';
import { clearRegister, setCredential } from '../../../slices/authSlice';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import { openSignInModal } from '../../../slices/modalSlice/SingInModalSlice';
import { MyError } from '../../../validations/validationTypes';



const OtpModal: React.FC = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const openModal = useSelector((state: RootState) => state.OtpSlice.value);
    const [otpVerification] = useOtpVerificationMutation();
    const [register] = useRegisterMutation();
    const [sendOtpToEmail] = useSendOtpTOMailMutation();
    const { registerInfo } = useSelector((state: RootState) => state.authSlice);
    const [timer, setTimer] = useState(60);
    const [showResendButton, setShowResendButton] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (openModal && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setShowResendButton(true);
        }

        return () => clearInterval(interval);
    }, [openModal, timer]);

    const [otp, setOtp] = useState('');
    const handleClose = () => {
        dispatch(closeOtpModal());
    };

    const handleVerifyOtp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(registerInfo)
        try {
            console.log('entered verify otp')
            const { email }: any = registerInfo;
            const res = await otpVerification({ otp, email }).unwrap();
            
            console.log('result in verify otp is :', res)
            if (res.success) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { username, email, password }: any = registerInfo;
                const result = await register({ username, email, password }).unwrap();
                if (result) {
                    console.log(result.user)
                    dispatch(setCredential({ ...result.user }));
                    dispatch(closeOtpModal());
                    dispatch(clearRegister());
                    dispatch(openSignInModal())
                    toast.success('Successfully Registered');
                }
            }
        } catch (err) {
            console.error(err);
            toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
        }
    };

    const handleResendOTP = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('entered resend otp')
        e.preventDefault();
        console.log(registerInfo)
        setTimer(60);
        setShowResendButton(false);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { email, username }: any = registerInfo;
            console.log("otp send email", email, username)
            const res = await sendOtpToEmail({ username, email }).unwrap();
            if (res) {
                toast.success(res.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to resend OTP');
        }
    };

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
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
                                value={otp}
                                name='otp'
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            />
                        </form>
                    </div>
                    <div className="flex flex-col pt-4 justify-center items-center">
                        {showResendButton ? (
                            <button onClick={handleResendOTP} className="bg-blue-500 rounded-md h-[40px] w-[110px] mr-5 text-white">Resend OTP</button>
                        ) : (
                            <button onClick={handleVerifyOtp} className="bg-blue-500 rounded-md h-[40px] w-[110px] mr-5 text-white">Verify</button>
                        )}
                        <p className="mt-3 text-red-500">
                            {timer > 0 ? `Resend OTP in ${timer} seconds` : ''}
                        </p>
                    </div>
                </Typography>
            </Box>
        </Modal>
    );
};

export default OtpModal;
