import { app } from "./infrastructureLayer/config/app"; // assuming app.ts is in the same directory
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8000;

const start = () => {
    console.log('Starting server...');

    app.get('/', (req, res) => {
        res.send('Hello from Express!');
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

start();




