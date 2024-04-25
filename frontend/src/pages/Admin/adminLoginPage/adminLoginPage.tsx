import './adminLoginPage.css'






const AdminLoginPage = () => {

    return (
        <>

            <div className="flex h-screen bg-[#E2D8F5]">
                <div className=" w-[50%] flex  items-center justify-center">
                    <form className="form-control" action="">
                        <p className="title flex justify-center">Admin Login</p>

                        <div className="input-field">
                            <input className="input" type="text" />
                            <label className="label" htmlFor="emailInput">Enter Email</label>
                        </div>
                        <div className="input-field">
                            <input className="input" type="password" />
                            <label className="label" htmlFor="passwordInput">Enter Password</label>
                        </div>

                        <button className="submit-btn">Login</button>
                        <div className='flex justify-center'>

                        </div>
                    </form>
                </div>
                <div className="flex  items-center w-[50%]">
                    <img src="/src/assets/iamges/admin_login.webp" alt="admin-login-img" />
                </div>
            </div>

        </>
    )
}

export default AdminLoginPage