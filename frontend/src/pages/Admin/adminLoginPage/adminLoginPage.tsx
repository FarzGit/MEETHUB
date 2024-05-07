import './adminLoginPage.css'
import { useAdminLoginMutation } from '../../../slices/adminSlice'
import { useFormik } from 'formik'
import { FormSignIn,MyError } from '../../../validations/validationTypes'
import { signInValidation } from '../../../validations/yupValidation'
import { setAdminCredential } from '../../../slices/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const AdminLoginPage = () => {


    const [adminLogin] = useAdminLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const initialValues: FormSignIn = {
        email: '',
        password: ''
    }

    const { values, handleSubmit, handleChange, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: signInValidation,

        onSubmit: async (values)=>{

            try {

                const {email,password} = values
                const res = await adminLogin({email,password}).unwrap()
                console.log(res)
                dispatch(setAdminCredential({...res.data}))
                navigate('/users-list')
                toast.success(res.message)

                
            } catch (err) {
                console.log(err)
                toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
                
            }

        }

    })




    return (
        <>

            <div className="flex h-screen bg-[#E2D8F5]">
                <div className=" w-[50%] flex  items-center justify-center">
                    <form onSubmit={handleSubmit} className="form-control" >
                        <p className="title flex justify-center">Admin Login</p>

                        <div className="input-field">
                            <input className="input" type="text" name='email' onChange={handleChange} value={values.email} />
                            <label className="label" htmlFor="emailInput">Enter Email</label>
                        </div>
                        {errors.email && touched.email && (
                                    <div className="text-red-500 text-[12px]">{errors.email}</div>
                                )}
                        <div className="input-field">
                            <input className="input" type="password" name='password' onChange={handleChange} value={values.password} />
                            <label className="label" htmlFor="passwordInput">Enter Password</label>
                        </div>

                        <button type='submit' className="submit-btn">Login</button>
                        <div className='flex justify-center'>

                        </div>
                    </form>
                </div>
                <div className="flex  items-center w-[50%] max-lg:hidden">
                    <img src="/src/assets/iamges/admin_login.webp" alt="admin-login-img" />
                </div>
            </div>

        </>
    )
}

export default AdminLoginPage