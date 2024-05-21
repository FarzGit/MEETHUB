import LandingPageNav from "../../../components/Navbar/landingPageNav.tsx"
import './landingCSS.css'
import { openSignupModal } from '../../../slices/modalSlice/signupModalSlice.ts.ts'
import { useDispatch } from 'react-redux'
import MyModal from "../../../components/forms/SignUp/signUpForm.tsx"



const LandingPage = () => {

    


    const dispatch = useDispatch()

    const handleGetStarted = () => {
        dispatch(openSignupModal())
    }

    return (
        <>
            <LandingPageNav />
            <div className="landingMainDiv pl-[75px] pr-[75px]  max-sm:pl-[30px] ">
                <div className="md:flex justify-between items-center">
                    <div className="flex flex-col  w-[400px] max-sm:w-[100%] sm:flex sm:justify-center leading-[23px]   ">
                        <span className="font-normal text-[55px] md:text-[65px] leading-[65px] max-sm:leading-[30px] max-sm:text-[30px]" >Welcome to <span className=" meethub text-[60px] max-sm:text-[30px] font-bold ">Meethub</span>  </span>
                        <span className="wrap-text pt-4 text-gray-500">Meethub is your premier destination for
                            seamless online meetings
                            tailored specifically for the IT sector. Whether it's interviews,
                            team collaborations, or client presentations,
                            Meethub provides the tools and platform to make your virtual interactions
                            productive and efficient</span>
                        <button className=" btn mt-6 " onClick={handleGetStarted}>GET STARTED</button>
                    </div>
                    <div>
                        <img className="image xl:h-[545px] lg:h-[500px] md:h-[400px] max-sm:hidden  " src="/src/assets/iamges/landing-page-1-image.png" alt="Image" />
                    </div>
                </div>
                <MyModal />
            </div>
        </>
    )
}

export default LandingPage