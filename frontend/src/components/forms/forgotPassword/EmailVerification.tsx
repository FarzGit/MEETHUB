import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IoClose } from "react-icons/io5";
import style from '../ModalStyles/modalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { closeVerifyEmailModal } from '../../../slices/modalSlice/verifyEmail';
import { openOtpModal } from '../../../slices/modalSlice/otp';
import { useSendForgetEmailOtpMutation } from '../../../slices/userSlice';
import { setForgotRegister } from '../../../slices/authSlice';
import { useFormik } from 'formik';
import { VerifyEmail } from '../../../validations/validationTypes';
import { toast } from 'react-toastify';
import { MyError } from '../../../validations/validationTypes';





const EmailVerificatioin = () => {

    const openModal = useSelector((state: RootState) => state.verifyEmailSlice.value)
    const dispatch = useDispatch()
    const [sendForgetEmailOtp] = useSendForgetEmailOtpMutation()

    const handleClose = () => {
        dispatch(closeVerifyEmailModal())
    }


    // const handleVerifyButton = ()=>{
    //     dispatch(closeVerifyEmailModal())
    //     dispatch(openOtpModal())
    // }


    const initialValues:VerifyEmail = {
        email:''
    }


const {values,handleSubmit,handleChange}=useFormik({
    initialValues:initialValues,
    onSubmit: async(values)=>{
        dispatch(setForgotRegister({...values}))
        try{
            const {email} = values
            console.log(email)
            const username = email.split("@")[0];
            console.log(username)

            const res = await sendForgetEmailOtp({username,email}).unwrap()
            dispatch(closeVerifyEmailModal())
            dispatch(openOtpModal())
            toast.success(res.message)
            

        }catch(err){
            console.log(err)
            toast.error((err as MyError)?.data?.message || (err as MyError)?.error);

        }

    }


})


    return (
        <>

            <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: '#159CDB', fontWeight: 600 }}>
                        <div className='flex justify-between'>
                            <span>Email Verification</span>
                            <span onClick={handleClose} className='cursor-pointer' ><IoClose color='grey' /></span>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <p className="text-[11px] p-1 text-gray-700 ">Please enter the email associated with your current account</p>
                                <input
                                    type="text"
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="mb-[2px] mt-2 text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                        <div className="flex flex-col pt-4 justify-center items-center">

                            <button type="submit" className="bg-blue-500 rounded-md h-[40px] w-[110px] mr-5 text-white">Verify</button>

                        </div>
                            </form>
                        </div>
                    </Typography>
                </Box>
            </Modal>

        </>

    )
}

export default EmailVerificatioin

