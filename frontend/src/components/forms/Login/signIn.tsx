import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store.ts';
import { openSignupModal } from '../../../slices/modalSlice/signupModalSlice.ts';
import { closeSignInModal } from '../../../slices/modalSlice/SingInModalSlice';
import style from '../ModalStyles/modalStyle.tsx';
import { useFormik } from 'formik';
import { FormSignIn, MyError } from '../../../validations/validationTypes.ts';
import { useUserLoginMutation, useGoogleAuthMutation } from '../../../slices/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import { setCredential } from '../../../slices/authSlice.ts';
import { toast } from 'react-toastify';
import { signInValidation } from '../../../validations/yupValidation.tsx';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { openVerifyEmailModal } from '../../../slices/modalSlice/verifyEmail.ts';
import EmailVerificatioin from '../ForgotPassword/emailVerification.tsx';







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
    const [googleAuth] = useGoogleAuthMutation()


    const initialValues: FormSignIn = {
        email: '',
        password: ''
    }


    const { values, handleSubmit, handleChange, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: signInValidation,


        onSubmit: async (values) => {
            try {

                const { email, password } = values
                const res = await userLogin({ email, password }).unwrap()

                dispatch(setCredential({ ...res.data }))
                dispatch(closeSignInModal())
                navigate('/home')
                toast.success(res.message)


            } catch (err) {
                console.log(err)
                toast.error((err as MyError)?.data?.message || (err as MyError)?.error);

            }
        }


    })


    interface DecodedCredential {
        name: string;
        email: string;
      }


      const handleForgottenPassword = ()=>{
        dispatch(closeSignInModal())
        dispatch(openVerifyEmailModal())
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
                                {errors.email && touched.email && (
                                    <div className="text-red-500 text-[12px]">{errors.email}</div>
                                )}
                                <span className="text-[15px] p-1 text-gray-700">Password</span>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    name='password'
                                    onChange={handleChange}
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                                <div className='flex justify-end text-blue-400 text-[12px] cursor-pointer'>
                                    <span onClick={handleForgottenPassword}>forgotten password</span>
                                </div>
                                <div className="flex flex-col items-center pt-4 justify-center gap-5">
                                    <button type='submit' className="bg-blue-500 rounded-md h-[40px] w-[110px]   text-white">SignIn</button>
                                    <GoogleLogin
                                        onSuccess={async (credentialResponse) => {
                                            if (credentialResponse?.credential) {
                                                const decoded = jwtDecode(credentialResponse.credential) as DecodedCredential;
                                                const { name, email } = decoded;
                                                const username = name

                                                

                                                const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                                                let password = '';
                                                for (let i = 0; i < 6; i++) {
                                                    const randomIndex = Math.floor(Math.random() * charset.length);
                                                    password += charset.charAt(randomIndex);
                                                }
                                                

                                                try {

                                                    console.log(username)
                                                    // console.log(email)
                                                    // console.log(password)



                                                    const res = await googleAuth({ username, email, password }).unwrap()
                                                    // console.log(res.data)
                                                    dispatch(setCredential({ ...res.data }));
                                                    dispatch(closeSignInModal())
                                                    toast.success(res.message);
                                                    navigate('/home')
                                                } catch (err) {
                                                    toast.error(
                                                        (err as MyError)?.data?.message || 
                                                        (err as MyError)?.error
                                                    );
                                                }
                                            } else {
                                                console.log("Credential not found");
                                            }


                                        }}
                                        onError={() => {
                                            toast.error("Login failed");
                                        }}
                                    />
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
            <EmailVerificatioin/>
        </div>
    );
};

export default SignInModal;