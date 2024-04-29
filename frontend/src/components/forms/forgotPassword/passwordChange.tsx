import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import style from '../ModalStyles/modalStyle.tsx';
// import EmailVerification from '../ForgotPassword/emailVerification.tsx';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store.ts';
import { closechangePasswordModal } from '../../../slices/modalSlice/changePassword.ts';
import { changePassword } from '../../../validations/validationTypes.ts';
import { useFormik } from 'formik';
import { newPasswordValidation } from '../../../validations/yupValidation.tsx';
import { useForgotPasswordMutation } from '../../../slices/userSlice.ts';
import { clearForgotRegister } from '../../../slices/authSlice.ts';
import { toast } from 'react-toastify';


const PasswordChange = ()=>{


    const openModal = useSelector((state:RootState)=>state.changePasswordSlice.value)
    const dispatch = useDispatch()
    const {forgotEmailInfo} = useSelector((state:RootState)=>state.authSlice)
    const [forgotPassword] = useForgotPasswordMutation()


    const handleClose = ()=>{
        dispatch(closechangePasswordModal())
    }

    const initialValues:changePassword = {
        password :'',
        confirmpassword : ''
    }

    const {values,handleSubmit,handleChange,errors,touched} = useFormik({

        initialValues:initialValues,
        validationSchema:newPasswordValidation,
        onSubmit: async (values)=>{

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const {email}:any = forgotEmailInfo
            const {password} = values

            const res = await forgotPassword({email,password}).unwrap()

            if(res.success){

                dispatch(closechangePasswordModal())
                dispatch(clearForgotRegister())
                toast.success(res.message)
            }
            

        }

    })

    return(
        <>
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
                            <form onSubmit={handleSubmit} >

                                <span className="text-[15px] p-1 text-gray-700">New Password</span>
                                <input
                                    type="password"
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                                {errors.password && touched.password &&(
                                    <div className="text-red-500 text-[12px]">{errors.password}</div>
                                )}
                                <span className="text-[15px] p-1 text-gray-700">Confirm Password</span>
                                <input
                                    type="password"
                                    placeholder="Enter confirm Password"
                                    name='confirmpassword'
                                    onChange={handleChange}
                                    value={values.confirmpassword}
                                    className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                />
                                 {errors.confirmpassword && touched.confirmpassword &&(
                                    <div className="text-red-500 text-[12px]">{errors.confirmpassword}</div>
                                )}
                                <div className="flex flex-col items-center pt-4 justify-center gap-5">
                                    <button type='submit' className="bg-blue-500 rounded-md h-[40px] w-[110px]   text-white">Update</button>
                                   
                                </div>
                            </form>
                        </div>

                        
                    </Typography>
                </Box>
            </Modal>
            {/* <EmailVerification/> */}
        </div>
        </>
    )
}

export default PasswordChange