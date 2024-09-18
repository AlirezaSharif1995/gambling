import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as Auth from './Authentication'; // Import from index.ts

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use('/register', Auth.registerRoutes);
app.use('/login', Auth.loginRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('Test socket is worked!');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
