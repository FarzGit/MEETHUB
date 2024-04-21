import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FcGoogle } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { openSignupModal } from '../../../slices/modalSlice/signupModalSlice.ts';
import { closeSignInModal } from '../../../slices/modalSlice/SingInModalSlice';
import style from '../modalStyles/modalStyle.tsx';
import { useFormik } from 'formik';
import { FormSignIn } from '../../../validations/validationTypes.ts';
import { useUserLoginMutation } from '../../../slices/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import { setCredential } from '../../../slices/authSlice.ts';
import { toast } from 'react-toastify';





const SignInModal: React.FC = () => {
    const openModal = useSelector((state: RootState) => state.SingInModalSlice.value);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleClose = () => {
        console.log('entered');
        dispatch(closeSignInModal());
    };
    const handleSignUp = () => {
        dispatch(closeSignInModal())
        dispatch(openSignupModal())
    }

    const [userLogin] = useUserLoginMutation()


    const initialValues: FormSignIn = {
        email: '',
        password: ''
    }


    const { values, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,

        onSubmit: async (values) => {
            try {

                const { email, password } = values
                const res = await userLogin({ email, password }).unwrap()
                if (res) {

                    dispatch(setCredential({ ...res.data }))
                    dispatch(closeSignInModal())
                    navigate('/home')
                    toast.success(res.message)

                }
            } catch (error) {
                console.log(error)

            }
        }


    })



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
                        Sign In
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <form onSubmit={handleSubmit}>

                                <span className="text-[15px] p-1 text-gray-700">Email</span>
                                <input
                                    type="text"
                                    value={values.email}
                                    name='email'
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                                <span className="text-[15px] p-1 text-gray-700">Password</span>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    name='password'
                                    onChange={handleChange}
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                                <div className='flex justify-end text-blue-400 cursor-pointer'>
                                    <span>forgotten password</span>
                                </div>
                                <div className="flex pt-4 justify-center">
                                    <button type='submit' className="bg-blue-500 rounded-md h-[40px] w-[110px] mr-5  text-white">SignIn</button>
                                    <button className=" rounded-md h-[40px] p-2 w-[110px] flex gap-2 border">
                                        <span className="pt-1">
                                            <FcGoogle />
                                        </span>
                                        SignIn
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-center text-[13px] pt-2 ">
                            <span className="text-gray-600">
                                Don’t have an account ?<span onClick={handleSignUp} className="text-blue-500 cursor-pointer "> SignUp</span>
                            </span>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default SignInModal;