import React, { useEffect, useRef, useState } from 'react';
import { IoIosCall } from "react-icons/io";
import { BsFillMicMuteFill } from "react-icons/bs";
import { MdOutlineScreenShare } from "react-icons/md";
import { FaVideoSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { RiMore2Fill } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import { useSocket } from '../../context/SocketProvider';
import './meetCard.css'

type PeerConnections = {
    [key: string]: RTCPeerConnection;
};

type VideoRefs = {
    [key: string]: HTMLVideoElement;
};

const MeetCard: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRefs = useRef<VideoRefs>({});
    const peersRef = useRef<PeerConnections>({});
    const localStreamRef = useRef<MediaStream | null>(null); // Added localStreamRef
    const { socket } = useSocket();
    const userId = useRef<string>(Math.random().toString(36).substr(2, 9));
    const [videoEnabled, setVideoEnabled] = useState<boolean>(true);

    useEffect(() => {
        const handleUserConnected = async (userId: string) => {
            const peerConnection = createPeerConnection(userId);
            const stream = localStreamRef.current!;
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            socket.emit('offer', { targetUserId: userId, offer });
        };

        const handleUserDisconnected = (userId: string) => {
            if (peersRef.current[userId]) {
                peersRef.current[userId].close();
                delete peersRef.current[userId];
                const videoElement = document.getElementById(userId);
                if (videoElement) {
                    videoElement.remove();
                }
            }
        };

        const handleOffer = async ({ userId, offer }: { userId: string, offer: RTCSessionDescriptionInit }) => {
            const peerConnection = createPeerConnection(userId);
            peersRef.current[userId] = peerConnection;

            const desc = new RTCSessionDescription(offer);
            await peerConnection.setRemoteDescription(desc);

            const stream = localStreamRef.current!;
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            socket.emit('answer', { targetUserId: userId, answer });
        };

        const handleAnswer = async ({ userId, answer }: { userId: string, answer: RTCSessionDescriptionInit }) => {
            const peerConnection = peersRef.current[userId];
            const desc = new RTCSessionDescription(answer);
            await peerConnection.setRemoteDescription(desc);
        };

        const handleNewICECandidate = async ({ userId, candidate }: { userId: string, candidate: RTCIceCandidateInit }) => {
            const peerConnection = peersRef.current[userId];
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        };
        

        const createPeerConnection = (targetUserId: string): RTCPeerConnection => {
            const peerConnection = new RTCPeerConnection();

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('ice-candidate', { targetUserId, candidate: event.candidate });
                }
            };

            peerConnection.ontrack = (event) => {
    let videoRef = remoteVideoRefs.current[targetUserId];
    if (!videoRef) {
        videoRef = document.createElement('video');
        videoRef.id = targetUserId;
        videoRef.autoplay = true;
        videoRef.style.width = '100%';
        videoRef.style.maxWidth = '16rem';
        videoRef.style.borderRadius = '0.5rem';
        document.getElementById('remoteVideos')!.appendChild(videoRef);
        remoteVideoRefs.current[targetUserId] = videoRef;
    }
    videoRef.srcObject = event.streams[0];
};

            peersRef.current[targetUserId] = peerConnection;
            return peerConnection;
        };

        const joinRoom = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localStreamRef.current = stream; 
            localVideoRef.current!.srcObject = stream;

            socket.emit('room:join', { roomId, userId: userId.current });

            socket.on('user-connected', handleUserConnected);
            socket.on('user-disconnected', handleUserDisconnected);
            socket.on('offer', handleOffer);
            socket.on('answer', handleAnswer);
            socket.on('ice-candidate', handleNewICECandidate);
        };

        joinRoom();

        return () => {
            socket.off('user-connected', handleUserConnected);
            socket.off('user-disconnected', handleUserDisconnected);
            socket.off('offer', handleOffer);
            socket.off('answer', handleAnswer);
            socket.off('ice-candidate', handleNewICECandidate);
        };
    }, [roomId, socket]);

    const toggleVideo = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
            setVideoEnabled(prev => !prev);
        }
    };

    return (
        <>
            <div className="bg-container">
    <div className="video-container">
        <video ref={localVideoRef} autoPlay muted style={{ width: '400px' }}></video>
    </div>
    <div id="remoteVideos"></div>
</div>

            <div className="mt-4 flex justify-center">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4 flex gap-8 justify-center">
                        <div className="bg-white p-1 rounded-lg">
                            <p className="flex text-white font-medium gap-2">
                                <span><HiMiniSpeakerWave size={30} color="black" /></span>
                            </p>
                        </div>
                        <div className="bg-white p-1 rounded-lg">
                            {videoEnabled ? (
                                <p onClick={toggleVideo} className="flex text-white font-medium gap-2">
                                    <span><FaVideo size={30} color="black" /></span>
                                </p>
                            ) : (
                                <p onClick={toggleVideo} className="flex text-white font-medium gap-2">
                                    <span><FaVideoSlash  size={30} color="black" /></span>
                                </p>
                            )}
                        </div>
                        <div className="bg-red-700 p-1 rounded-lg">
                            <p className="flex text-white font-medium gap-2">
                                <span><IoIosCall color="white" size={30} /></span>
                            </p>
                        </div>
                        <div className="bg-white p-1 rounded-lg">
                            <p className="flex text-white font-medium gap-2">
                                <span><BsFillMicMuteFill size={30} color="black" /></span>
                            </p>
                        </div>
                        <div className="bg-white p-1 rounded-lg">
                            <p className="flex text-white font-medium gap-2">
                                <span><MdOutlineScreenShare size={30} color="black" /></span>
                            </p>
                        </div>
                        <div className="">
                            <div className="cursor-pointer">
                                <RiMore2Fill size={30} color="white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MeetCard;
