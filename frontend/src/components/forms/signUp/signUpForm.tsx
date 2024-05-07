import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useGoogleAuthMutation } from '../../../slices/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import { RootState } from '../../../redux/store.ts';
import { closeSignupModal } from '../../../slices/modalSlice/signupModalSlice.ts.ts';
import { openSignInModal } from '../../../slices/modalSlice/SingInModalSlice.ts'
import SignInModal from '../Login/signIn.tsx';
import OtpModal from '../Otp/otp.tsx';
import style from '../ModalStyles/modalStyle.tsx';
import { FormSignUp,MyError } from '../../../validations/validationTypes.ts';
import { clearRegister, setCredential, setRegister } from '../../../slices/authSlice.ts';
import { useSendOtpTOMailMutation } from '../../../slices/userSlice.ts';
import { openOtpModal } from '../../../slices/modalSlice/otp.ts';
import { signUpValidation } from '../../../validations/yupValidation.tsx';




const MyModal: React.FC = () => {



    const openModal = useSelector((state: RootState) => state.signupModal.value);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [otpSendToEmail] = useSendOtpTOMailMutation()
    const [googleAuth] = useGoogleAuthMutation()




    const initialValues: FormSignUp = {
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    }


    const { values, handleChange, handleSubmit,errors,touched } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpValidation,

        onSubmit: async (values) =>{
            dispatch(setRegister({ ...values }));
            try {
                console.log(values)
                const { username, email } = values;
                const res = await otpSendToEmail({ username, email }).unwrap();
                    dispatch(closeSignupModal());
                    dispatch(openOtpModal());
                    toast.success(res.message)
            } catch (err) {
                dispatch(clearRegister())
                toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
            }
        },

    })



    const handleClose = () => {
        console.log('entered');
        dispatch(closeSignupModal());
    };

    const handleSignIn = () => {
        dispatch(closeSignupModal())
        dispatch(openSignInModal())
    }




    interface DecodedCredential {
        name: string;
        email: string;
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
                        Sign Up
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <span className="text-[15px] p-1 text-gray-700">Username</span>
                                <input
                                    type="text"
                                    name='username'
                                    value={values.username}
                                    onChange={handleChange}
                                    placeholder="username"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                                {errors.username && touched.username && (
                                    <div className="text-red-500 text-[12px]">{errors.username}</div>
                                )}
                                <span className="text-[15px] p-1 text-gray-700">Email</span>
                                <input
                                    type="text"
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />{errors.email && touched.email && (
                                    <div className="text-red-500 text-[12px]">{errors.email}</div>
                                )}
                                <span className="text-[15px] p-1 text-gray-700">Password</span>
                                <input
                                    type="password"
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                                {errors.password && touched.password && (
                                    <div className="text-red-500 text-[12px]">{errors.password}</div>
                                )}
                                <span className="text-[15px] p-1 text-gray-700">Confirm password</span>
                                <input
                                    type="password"
                                    name='confirmpassword'
                                    value={values.confirmpassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                                {errors.confirmpassword && touched.confirmpassword && (
                                    <div className="text-red-500 text-[12px]">{errors.confirmpassword}</div>
                                )}
                                <div className="flex pt-4 justify-center flex-col gap-1 items-center" >
                                    <button type='submit' className="bg-blue-500 rounded-md h-[40px] w-[110px]  text-white">SignUp</button>
                                    <span className='text-[#C7C8CC]'>or</span>
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
                                                    dispatch(closeSignupModal())
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
                                                toast.error("Credential not found")
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
                                Already have an account ?<span onClick={handleSignIn} className="text-blue-500"> SignIn</span>
                            </span>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            <SignInModal />
            <OtpModal />
        </div>
    );
};

export default MyModal;