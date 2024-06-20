// Importing necessary libraries
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from '../routes/userRoute';
import errorHandler from '../../usecaseLayer/handler/errorHandler';
import adminRoute from '../routes/adminRoute';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { Rooms } from '../../domain/socket';
// Load environment variables
dotenv.config();

// Creating the Express app
 const app = express();
 export const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', 
        
    }
});


  
 
// Middleware setup
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const rooms: Rooms = {};



app.get('/create-room', (req, res) => {
    console.log('the user entered in to create room')
    const roomId = uuidv4();
    rooms[roomId] = []
    res.json({ roomId });
  });

   const WebRtc = ()=>{

    io.on('connection', (socket) => {
        console.log('user connected on the id :',socket.id)
        socket.on('room:join', ({ roomId}) => {
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    console.log('the rooms is rooms :',rooms)
    rooms[roomId].push(socket.id);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected', socket.id);

    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-disconnected', socket.id);
      rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
    });

    socket.on('offer', ({ targetUserId, offer }) => {
      socket.to(targetUserId).emit('offer', { userId: socket.id, offer });
    });

    socket.on('answer', ({ targetUserId, answer }) => {
      socket.to(targetUserId).emit('answer', { userId: socket.id, answer });
    });

    socket.on('ice-candidate', ({ targetUserId, candidate }) => {
      socket.to(targetUserId).emit('ice-candidate', { userId: socket.id, candidate });
    });
  });
      });


  }


//Routes

app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)

app.use(errorHandler)

export default WebRtc

