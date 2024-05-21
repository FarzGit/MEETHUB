import { JitsiMeeting } from '@jitsi/react-sdk';


const MeetInterface = () => {


    const options = {
        roomName: 'YourMeetingName',
        parentNode: 'jitsi-container',
        configOverwrite: {
            startWithAudioMuted: true,
            startWithVideoMuted: true
        },
        interfaceConfigOverwrite: {
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
        }
    };



    return (
        <>

            <div className="p-3 bg-[#21242B] h-screen ">

                <div className="flex justify-start items-center gap-3">
                    <img className="h-[60px]" src="src/assets/iamges/second-project-logo-single.png" alt="logo" />
                    <h1 className=" text-white font-bold text-2xl">MEETHUB</h1>
                </div>


                <div className="bg-[#1A1B20] h-[700px] rounded-t-xl">

                <div style={{ height: '700px', width: '100%' }}>
            <JitsiMeeting
                roomName={options.roomName}
                configOverwrite={options.configOverwrite}
                interfaceConfigOverwrite={options.interfaceConfigOverwrite}
                getIFrameRef={node => node.style.height = '100%'}
            />
        </div>

                </div>


            </div>

        </>
    )
}


export default MeetInterface