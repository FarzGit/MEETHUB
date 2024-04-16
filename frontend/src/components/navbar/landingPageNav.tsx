
import './landingPageNav.css'


const LandingPageNav = ():JSX.Element => {
    return (
        <>

            <div className="maindiv pl-[75px] pr-[75px] max-sm:pl-[30px] max-sm:pr-[30px]">
                <div className='navbar h-[150px]'>
                    <div className='flex justify-between items-center h-[150px]' >
                        <img className='logo md:h-[90px] max-[400px]:h-[50px] ' src="/src/assets/iamges/second-project-logo.png" alt="Logo" />
                        <div className='flex justify-between w-[10%] gap-2 max-sm:hidden'>
                            <button className='outline outline-1 outline-blue-400 rounded-md p-1 text-blue-400 w-[80px] text-[14px] '>SignUp</button>
                            <button className='outline outline-1 outline-zinc-400 rounded-md p-1 text-zinc-400 w-[80px] text-[14px] '>SignIn</button>
                        </div>

                    </div>
                </div>
            </div>


        </>

    )
}


export default LandingPageNav
