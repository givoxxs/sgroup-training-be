import express from 'express';
import fs from 'fs';
import routers from './apis';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api', routers);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})