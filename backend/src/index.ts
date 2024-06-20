import { server } from "./infrastructure/config/app"; // assuming app.ts is in the same directory
import dotenv from 'dotenv';
import connectDb from "./infrastructure/config/db";
import WebRtc from "./infrastructure/config/app";

dotenv.config();

const port = process.env.PORT || 8000;



const start = () => {
    console.log('Starting server...');
    
    WebRtc()

    server.listen(port, () => {
        connectDb()
        console.log(`Server is running on http://localhost:${port}`);
    });
};

start();




