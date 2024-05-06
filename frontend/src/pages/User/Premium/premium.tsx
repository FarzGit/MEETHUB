import HomePageNav from "../../../components/Navbar/homePageNav"
import './premium.css'
import { loadStripe,Stripe  } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { usePaymentMutation } from "../../../slices/userSlice";
import { RootState } from "../../../redux/store";
import { Link } from "react-router-dom";
const public_stripe_key = import.meta.env.VITE_PUBLIC_STRIPE_KEY
// const stripePromise = loadStripe('pk_test_51PB8mpSEVuL1FI1r7jbat474TSCFRPHyJBxZJkbNmanTC7QwN0bapTeuqBuratB79rcP6CkIMykmkkeEClILnPGj0071Q53iFl');


const PremiumPage = () => {

    // const dispatch = useDispatch()
    const {userInfo} = useSelector((state:RootState)=>state.authSlice)
    const [payment] = usePaymentMutation()


    


    const handlePurchase = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const stripePromise: Stripe | null  = await loadStripe(public_stripe_key);

        const userId = userInfo?._id
        const email = userInfo?.email

        const amount = 2000
        const res = await payment({ amount,email,userId }).unwrap()
        const session = res
        console.log(res)

        if (stripePromise) {
            stripePromise.redirectToCheckout({
                sessionId: session.data,
            });
        } else {
            console.error('Failed to initialize Stripe');
            // Handle the error appropriately
        }

    }


    return (
        <>
            <HomePageNav />
            <div className="landingMainDiv pl-[75px] pr-[75px]  ">
                <div className=" flex justify-between items-center cardDiv max-lg:flex-col min-sm:hidden">
                    <div className=" card flex flex-col items-center  w-[400px] max-sm:w-[100%] leading-[23px]  p-9 ml-[80px] max-2xl:mr-[60px] max-lg:w-[100%]  ">
                        <div>
                            <img src="/src/assets/iamges/VIP-badge.png" alt="" />
                        </div>
                        <div className="">
                            <div className="py-3 flex">
                                <span className="pr-3">
                                    &bull;
                                </span>
                                <p>
                                    Get A Verified Badge with name
                                </p>
                            </div>
                            <div className="flex py-3">
                                <span className="pr-3">
                                    &bull;
                                </span>
                                <p>
                                    Easily capture your interview  with our video recording feature.
                                </p>
                            </div>
                            <div className="flex py-3">
                                <span className="pr-3">
                                    &bull;
                                </span>
                                <p >
                                    Enjoy the freedom of limitless video storage in the cloud
                                </p>
                            </div>
                        </div>
                        <form onSubmit={handlePurchase} >
                            {/* <CardElement /> */}
                            <div>
                                <button type="submit" className=" btn mt-6 " >Purchase</button>
                            </div>
                        </form>
                    </div>
                    <div className=" secondDivContents flex flex-col justify-start w-[50%] gap-5 mr-[80px] h-[500px] max-lg:w-[100%] max-lg:pl-[60px]">
                        <div className="flex justify-end">
                            <Link to='/home' className="backButton border p-2 rounded-lg w-[100px] font-bold max-lg:hidden">Back</Link>
                        </div>
                        <div className=" pt-6 max-sm:w-0">
                            <p className="text-6xl">
                                Be a <span className="font-bold">Premium</span> member
                            </p>
                            <p className="text-6xl">
                                <span className="font-bold text-[#d4922e]" >$15</span> only, Upgrade now!
                            </p>
                        </div>
                        <div className="pt-10">
                            <p className=" text-gray-500 text-lg">
                                Upgrade to our Premium Membership and gain exclusive access to advanced
                                features that elevate your interviewing experience.
                                Enjoy unlimited storage for your video recordings in the cloud,
                                priority scheduling options, personalized support,
                                and enhanced analytics to track your progress.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PremiumPage