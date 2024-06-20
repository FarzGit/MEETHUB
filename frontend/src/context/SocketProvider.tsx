/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext} from "react";
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket;
}

interface SocketProviderProps {
    children: ReactNode;
}


const SocketContext = createContext<SocketContextType | undefined>(undefined);


export const useSocket = (): SocketContextType => {
    const socket = useContext(SocketContext);
    if (socket === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
      }
    
    return socket;
  };



export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const socket: Socket = io('http://localhost:8000');


    return (
        <SocketContext.Provider value={{ socket: socket! }}>
            {children}
        </SocketContext.Provider>
    )


}