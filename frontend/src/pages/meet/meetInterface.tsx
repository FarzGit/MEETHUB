/* eslint-disable @typescript-eslint/no-unused-vars */
import './meet.css';
import MeetCard from '../../components/meetControllers/meetCards.tsx'

const MeetInterface = () => {

    return (
        <>
            <div className="p-3 bg-[#21242B] h-screen">
                <div className="flex justify-start items-center gap-3">
                    <img className="h-[60px]" src="src/assets/iamges/second-project-logo-single.png" alt="logo" />
                    <h1 className="text-white font-bold text-2xl">MEETHUB</h1>
                </div>
                <MeetCard />
                
            </div>
        </>
    );
}

export default MeetInterface;
